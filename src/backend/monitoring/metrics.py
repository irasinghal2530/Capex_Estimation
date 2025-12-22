#src/backend/monitoring/metrics.py


import numpy as np

def trend(df):
    if len(df) < 5:
        return None

    y = df["prediction_value"].values
    x = np.arange(len(y))

    slope = np.polyfit(x, y, 1)[0]

    return {
        "direction": "up" if slope > 0 else "down" if slope < 0 else "flat",
        "slope": round(float(slope), 3)
    }


def anomalies(df):
    if df.empty:
        return []

    mean = df["prediction_value"].mean()
    std = df["prediction_value"].std()

    outliers = df[
        (df["prediction_value"] > mean + 3 * std) |
        (df["prediction_value"] < mean - 3 * std)
    ]

    return [
        {
            "id": int(r.prediction_id),
            "value": float(r.prediction_value),
            "timestamp": r.created_at.isoformat()
        }
        for _, r in outliers.iterrows()
    ]
