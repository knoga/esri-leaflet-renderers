EsriLeafletRenderers.Symbol = L.Class.extend({

  initialize: function(symbolJson){
    this._symbolJson = symbolJson;
    this.val = null;
    this._styles = {};
  },

  //the geojson values returned are in points
  pixelValue: function(pointValue){
    return pointValue * 1.3333333333333;
  },

  //color is an array [r,g,b,a]
  colorValue: function(color){
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  },

  alphaValue: function(color){
    return color[3] / 255.0;
  },

  getSize: function(feature, options) {

    var attr = feature.properties,
    sizeInfo = options || this.sizeInfo,
    field = sizeInfo && sizeInfo.field,
    size = 0,
    value = null;

    if (field) {
      value = attr[field];
      var minSize = sizeInfo.minSize,
      maxSize = sizeInfo.maxSize,
      minDataValue = sizeInfo.minDataValue,
      maxDataValue = sizeInfo.maxDataValue,
      featureRatio,
      normField = sizeInfo.normalizationField,
      normValue = attr ? parseFloat(attr[normField]) : undefined;
      if ( value === null || ( normField && ((isNaN(normValue) || normValue === 0)))) {
       return null;
      }

      if ( !isNaN(normValue) ) {
        value = value / normValue;
      }

      if ( minSize !== null && maxSize !== null && minDataValue !== null && maxDataValue !== null) {
        if (value <= minDataValue) {
          size = minSize;
        }
        else if (value >= maxDataValue) {
          size = maxSize;
        }
        else {
          featureRatio = (value - minDataValue) / (maxDataValue - minDataValue);
          size = minSize + (featureRatio * (maxSize - minSize));
        }
      }
      size = isNaN(size) ? 0 : size;
    }
    return size;
  }
});
