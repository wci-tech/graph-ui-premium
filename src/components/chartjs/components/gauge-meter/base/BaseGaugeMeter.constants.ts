export const GAUGE_METER_CONFIG = {
    rotation: -90,
    circumference: 180,

    cutout: '88%',

    layoutPadding: {
        top: 52,
        right: 56,
        bottom: 96,
        left: 56,
    },

    needleCenterOffset: 18,
    needleLengthRatio: 0.72,
    needleWidthRatio: 0.032,
    needleMinHalfWidth: 6,
    pivotRadiusRatio: 0.042,
    pivotMinRadius: 9,

    scaleDivisions: 10,
    scaleLabelFontSize: 12,
    scaleTickLength: 10,
    scaleTickWidth: 1.5,
    scaleLabelRadiusRatio: 0.81,
    scaleTickOuterRadiusRatio: 1,
    scaleTickInnerRadiusRatio: 0.94,

    segmentLabelRadiusRatio: 0.72,
    segmentLabelFontSize: 12,

    scoreFontSize: 44,
    scoreBottom: 28,
    scoreMarginBottom: 5,
} as const;