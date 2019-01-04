/* global define*/

define([
  'require',
  'handlebars',
  'moment',
  'underscore',
  'js/app',
  'js/models/settingsModel',
  './commonFunctions',
  'string'
], function (require,
             Handlebars,
             moment,
             _,
             app,
             settingsModel,
             commonFunctions,
             str) {
  'use strict';

  Handlebars.registerHelper('startedOnTime', function (seen, startedOn) {
    var sampleRate = 12;
    var time = '';
    if (seen !== undefined && seen !== null) {
      time = moment(startedOn).add(seen * sampleRate, 'minutes').fromNow();
    }
    return time;
  });

  Handlebars.registerHelper('readableIndex', function (number) {
    return number + 1;
  });

  Handlebars.registerHelper('tagActiveFor', function (startedOn, stoppedOn, returnData) {
    var duration;
    var timeValue;
    var timeUnit;
    if (stoppedOn) {
      duration = moment.duration(moment(stoppedOn).diff(startedOn)).humanize();
    } else {
      duration = moment.duration(moment().diff(startedOn)).humanize();
    }

    timeValue = parseFloat(duration);
    timeUnit = duration.split(' ').pop();

    return returnData === 'value' ? timeValue : timeUnit;
  });

  Handlebars.registerHelper('temperatureUnit', function () {
    return settingsModel.settingsModelObj.get('temperatureUnit');
  });

  Handlebars.registerHelper('temperatureValue', function (temperatureValue, numberOfDecimalPalces) {
    if (temperatureValue === undefined) {
      return '-';
    }
    return commonFunctions.removingDecimalPlaces(
      commonFunctions.convertTemperature(settingsModel.settingsModelObj.get('temperatureUnit'),
        temperatureValue), Number(numberOfDecimalPalces));
  });

  Handlebars.registerHelper('readableSample', function (count) {
    var sampleRate = 12;
    return moment.duration(count * sampleRate, 'minutes').humanize();
  });

  Handlebars.registerHelper('alertShortNotation', function (minutes) {
    var x = moment.duration(minutes, 'm');
    var retVal;
    if (x < 90) {
      retVal = Math.round(x.as('m')) + 'm';
    } else if (x.as('h') < 48) {
      retVal = Math.round(x.as('h')) + 'h';
    } else if (x.as('d') < 28) {
      retVal = Math.round(x.as('d')) + 'd';
    } else {
      retVal = Math.round(x.as('w')) + 'w';
    }
    return retVal;
  });

  Handlebars.registerHelper('readableDuration', function (minutes) {
    return moment.duration(minutes, 'minutes').humanize();
  });

  Handlebars.registerHelper('pluralize', function (number) {
    var retVal = '';
    if (Number(number) !== 1) {
      retVal = 's';
    }
    return retVal;
  });

  Handlebars.registerHelper('iconText', function (iconName, title) {
    var retVal = '';
    if (iconName === 'text-icon') {
      retVal = title ? title.substr(0, 1).toUpperCase() : '';
    }
    return retVal;
  });

  Handlebars.registerHelper('showSpecial', function (isThisSpecial) {
    return isThisSpecial === 'Yes' ? '<i class=\'icon-star center\'></i>' : '';
  });

  Handlebars.registerHelper('readableDate', function (date) {
    return moment(date).format('MMMM Do YYYY');
  });

  Handlebars.registerHelper('readableText', function (string) {
    return str(string).humanize().s;
  });

  Handlebars.registerHelper('readableDateTime', function (date) {
    return moment(date).format('MMM Do YYYY hh:mm A');
  });

  Handlebars.registerHelper('abbrivatedDateTime', function (date) {
    var now = moment().format();
    var formattedDate = moment(date).format();
    var retVal;
    if (moment(now).diff(moment(formattedDate), 'hours', true) <= 1) {
      retVal = moment(formattedDate).fromNow();
    } else if (moment(formattedDate).isSame(now, 'day')) {
      retVal = moment(formattedDate).format('hh:mm A');
    } else if (moment(formattedDate).isSame(now, 'year')) {
      retVal = moment(formattedDate).format('MMM Do');
    } else if (!moment(formattedDate).isSame(now, 'year')) {
      retVal = moment(formattedDate).format('MM/DD/YYYY');
    }
    return retVal;
  });

  Handlebars.registerHelper('timeStamp', function (date) {
    var now = moment().format();
    var formattedDate = moment(date).format();
    var retVal;
    if (moment(now).diff(moment(formattedDate), 'hours', true) <= 1) {
      retVal = moment(formattedDate).fromNow();
    } else {
      retVal = moment(formattedDate).format('hh:mm A');
    }
    return retVal;
  });

  Handlebars.registerHelper('timeFromNow', function (date) {
    var result = '';
    if (date) {
      result = moment(date).fromNow();
    }
    return result;
  });

  Handlebars.registerHelper('isEqual', function (value1, value2) {
    return value1 === value2;
  });

  Handlebars.registerHelper('isNotEqual', function (value1, value2) {
    return value1 !== value2;
  });

  Handlebars.registerHelper('isGetData', function (eventType) {
    return eventType === 'FTReadEvent' || eventType === 'FTStatusEvent';
  });

  Handlebars.registerHelper('showLastSeenTime', function (showLastSeenTime, readDataType) {
    return showLastSeenTime || readDataType !== 'NFC';
  });

  Handlebars.registerHelper('isAlertTriggered', function (alert, alertType, index) {
    return alert[alertType + (index + 1)];
  });

  Handlebars.registerHelper('numberOfActionsPerEvent', function (listOfActions, eventType) {
    var filteredTags = _.filter(listOfActions, function (action) {
      if (eventType === 'AggregationStatus') {
        return ((
          action.source === 'QR code' &&
          (action.tagJson.eventType === 'FTReadEvent' || action.tagJson.eventType === 'FTStatusEvent')
        ) || eventType === action.actionDetails.eventType);
      } else { // eslint-disable-line no-else-return
        if (action.source === 'QR code') { // eslint-disable-line no-lonely-if
          if (action.tagJson.eventType === 'FTReadEvent' ||
            action.tagJson.eventType === 'FTStatusEvent') {
            return false;
          }
          return eventType === action.actionDetails.eventType;
        } else { // eslint-disable-line no-else-return
          return eventType === action.tagJson.eventType;
        }
      }
    });
    return filteredTags.length;
  });

  Handlebars.registerHelper('contains', function (list, value, propertyName) {
    var array;
    var retVal;
    if (propertyName) {
      array = _.pluck(list, propertyName);
      retVal = _.contains(array, value);
    } else {
      retVal = _.contains(list, value);
    }
    return retVal;
  });
  Handlebars.registerHelper('slice', function (string, startIndex, endIndex) {
    return string ? string.slice(startIndex, endIndex) : string;
  });
  Handlebars.registerHelper('findChildAggregations', function (childAggregations) {
    var groupByAggregationUnit = _.groupBy(childAggregations, function (aggregation) {
      return aggregation.aggregationUnit.name;
    });

    return _.keys(groupByAggregationUnit);
  });

  Handlebars.registerHelper('isAggregationUnitActions', function (eventType) {
    return eventType === 'UnitCreate' || eventType === 'UnitUpdate' || eventType === 'UnitDelete';
  });

  Handlebars.registerHelper('aggregationUnitState', function (name) {
    var actionType = app.FTMobile.globals.actionType;
    var retVal = '';
    if (actionType === 'createAggregation' || actionType === 'breakAggregation') {
      if (name === 'tag') {
        retVal = 'disabled';
      }
    }
    return retVal;
  });

  Handlebars.registerHelper('getFullPath', function (path) {
    var baseUrl = app.FTMobile.globals.baseUrl;
    return path ? baseUrl.slice(0, baseUrl.length - 1) + path : '';
  });
  Handlebars.registerHelper('if_eq', function (a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this);
  });
  Handlebars.registerHelper('isDataAvailable', function (value, string) {
    var text;
    if (value) {
      text = str(value).humanize().s;
    } else {
      text = 'Not available';
      if (string) {
        text = str(string).humanize().s + ' not available';
      }
    }
    return text;
  });
  Handlebars.registerHelper('truncateTagId', function (tagId) {
    return tagId.substr(tagId.length - 13);
  });
  Handlebars.registerHelper('formatSessionContent', function (value, string) {
    var text;
    if (value) {
      text = str(value).humanize().s.substr(value.length - 13);
    } else {
      text = 'Not available';
      if (string) {
        text = str(string).humanize().s + ' not available';
      }
    }
    return text;
  });
  Handlebars.registerHelper('logDetail', function (logField) {
    return logField === 'Biz location' || logField === 'Readpoint';
  });

  Handlebars.registerHelper('findColorForAlert', function (numOfAlertsTriggered, totalAlertsTriggered) {
    var percentage = 0;
    var color;
    var defaultClass = 'bg-tag-status';
    var colorMap = [{
      colorClass: 'bg-tag-status red',
      percentage: 75
    }, {
      colorClass: 'bg-tag-status orange',
      percentage: 50
    }, {
      colorClass: 'bg-tag-status yellow',
      percentage: 25
    }, {
      colorClass: 'bg-tag-status green',
      percentage: 0
    }];

    if (totalAlertsTriggered > 0) {
      percentage = (numOfAlertsTriggered / totalAlertsTriggered) * 100;
    } else {
      percentage = 0;
    }
    color = _.find(colorMap, function (object) {
      return percentage >= object.percentage;
    });
    color = color ? color.colorClass : defaultClass;
    return color;
  });

  Handlebars.registerHelper('shortTagId', function (tagId, startIndex) {
    var result = '';
    if (tagId) {
      result = tagId.slice(startIndex);
    }
    return result;
  });

  Handlebars.registerHelper('humanizeDateTime', function (dateTime) {
    return moment(dateTime).fromNow();
  });
});
