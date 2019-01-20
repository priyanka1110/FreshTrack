/* eslint-disable */
/* global define, d3*/
/* eslint-disable no-mixed-operators*/
define([
    'require',
    'exports',
    'marionette',
    'backbone',
    'd3'
  ], function (require, exports, Marionette, Backbone, d3) {
    'use strict';
  
    exports.donut = function (elId, percentage, color, backgroundColor, textColor, id) {
      var DonutItemView = Backbone.Marionette.View.extend({
        prop: {
          pi: 2 * Math.PI,
          width: 36,
          height: 36,
          outerRadius: 0,
          innerRadius: 0,
          outerRadiusTwo: 0,
          innerRadiusTwo: 0,
          idNumber: 'donutTextID' + id
        },
        base: {},
        el: '#' + elId,
        render: function () {
          var self = this;
          var donutGraph;
          this.prop.outerRadiusTwo = Math.min(this.prop.width, this.prop.height) / 2;
          this.prop.innerRadiusTwo = (this.prop.outerRadiusTwo / 3.85) * 3;
          this.prop.innerRadius = this.prop.innerRadiusTwo +
            ((this.prop.outerRadiusTwo - this.prop.innerRadiusTwo) / 3);
          this.prop.outerRadius = this.prop.outerRadiusTwo -
            ((this.prop.outerRadiusTwo - this.prop.innerRadiusTwo) / 3);
          this.arc = d3.arc().innerRadius(this.prop.innerRadius).outerRadius(this.prop.outerRadius);
          this.arcTwo = d3.arc()
            .innerRadius(this.prop.innerRadiusTwo)
            .outerRadius(this.prop.outerRadiusTwo)
            .startAngle(0)
            .endAngle((0 / 100) * self.prop.pi);
          donutGraph = d3.select(this.el)
            .append('svg')
            .classed('donut', true)
            .attr('id', 'donut' + elId)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 ' + Math.min(this.prop.width, this.prop.height) + ' ' + Math.min(this.prop.width, this.prop.height))
            .attr('preserveAspectRatio', 'xMidYMid');
  
          self.base = donutGraph.append('g')
            .attr('id', 'donutID')
            .attr('transform', 'translate(' +
  
            (Math.min(self.prop.width, self.prop.height) / 2) + ',' +
            (Math.min(self.prop.width, self.prop.height) / 2) + ')');
  
          self.base.text = self.base.append('g');
          self.base.text.append('text')
            .classed('donutText', true)
            .attr('id', self.prop.idNumber)
            .attr('text-anchor', 'middle')
            .attr('dy', -this.prop.height * 0.07)
            .attr('dx', 0)
            .style('font-size', (this.prop.height * 0.01) + 'em')
            .style('fill', textColor);
  
          self.base.text.append('text')
            .classed('donutText', true)
            .attr('id', 'donutUnitID')
            .attr('text-anchor', 'middle')
            .attr('dy', this.prop.height * 0.13)
            .attr('dx', 0)
            .style('font-size', (this.prop.height * 0.01) + 'em')
            .style('fill', textColor);
  
          self.base.append('path')
            .data([{
              startAngle: 0,
              endAngle: self.prop.pi
            }])
            .attr('id', 'lineOne' + elId)
            .attr('d', self.arc)
            .style('fill', backgroundColor);
  
          self.base.append('path')
            .data([{
              startAngle: 0,
              endAngle: (0 / 100) * self.prop.pi
            }])
            .attr('id', 'lineTwo' + elId)
            .attr('d', self.arcTwo)
            .style('fill', color);
          self.donutPercentage(Number(percentage));
        },
        donutPercentage: function (newPer) {
          var self = this;
          var arcTwo = d3.arc()
            .innerRadius(this.prop.innerRadiusTwo)
            .outerRadius(this.prop.outerRadiusTwo);
          var arcTweenOne = function (transition, newAngle) {
            transition.attrTween('d', function (d) {
              var interpolate;
              d.innerRadius = self.prop.innerRadius;
              d.outerRadius = self.prop.outerRadius;
              interpolate = d3.interpolate(d.startAngle, newAngle);
              return function (t) {
                d.startAngle = interpolate(t);
                return self.arc(d);
              };
            });
          };
          var arcTweenTwo = function (transition, newAngle) {
            transition.attrTween('d', function (d) {
              var interpolate;
              d.innerRadius = self.prop.innerRadiusTwo;
              d.outerRadius = self.prop.outerRadiusTwo;
              interpolate = d3.interpolate(d.endAngle, newAngle);
              return function (t) {
                d.endAngle = interpolate(t);
                return arcTwo(d);
              };
            });
          };
          self.base.select('#lineOne' + elId)
            .attr('d', this.arc)
            .transition()
            .duration(2000)
            .call(arcTweenOne, (newPer / 100) * this.prop.pi);
          self.base.select('#lineTwo' + elId)
            .attr('d', arcTwo)
            .transition()
            .duration(2000)
            .call(arcTweenTwo, (newPer / 100) * this.prop.pi);
        }
      });
      var donutView = new DonutItemView();
      donutView.render();
    };
    exports.donutValue = function (elid, value, unit, id) {
      var ui = {
        pi: 2 * Math.PI,
        width: 36,
        height: 36,
        idNumber: '#donutTextID' + id
      };
      d3.select('#' + elid).select(ui.idNumber)
        .transition()
        .duration(1000)
        .text(value);
      if (unit) {
        d3.select('#' + elid).select('#donutUnitID')
          .transition()
          .duration(1000)
          .text(unit);
      } else {
        d3.select('#' + elid).select(ui.idNumber)
          .attr('dy', 4)
          .attr('dx', 0)
          .style('font-size', (ui.height * 0.025) + 'em');
      }
    };
  });
  