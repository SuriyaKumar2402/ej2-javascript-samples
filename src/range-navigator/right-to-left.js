/**
 * Sample for range navigator with RTL support
 */
var _this = this;
var selectedTheme = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
var theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
var themes = ['Material', 'Fabric', 'Bootstrap', 'HighContrast', 'Bootstrap5', 'Tailwind', 'MaterialDark', 'FabricDark', 'BootstrapDark', 'TailwindDark', 'Fluent', 'FluentDark'];
var borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4', '#262E0B', '#4F46E5', '#00bdae', '#4472c4', '#a16ee5', '#8B5CF6', '#614570', '#8AB113'];
var regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(38, 46, 11, 0.3)', 'rgba(79, 70, 229, 0.3)',
    'rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(139, 92, 246, 0.3)'];
this.renderRTLChart = function (datasrc) {
    var chart = new ej.charts.Chart({
        primaryXAxis: {
            valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift',
            isInversed: true, majorGridLines: { width: 0 }
        },
        primaryYAxis: {
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
            maximum: 87, minimum: 82, interval: 1
        },
        chartArea: { border: { width: 0 } },
        series: [{
            dataSource: datasrc, xName: 'xDate', yName: 'High', width: 2, type: 'Area',
            fill: 'url(#' + selectedTheme + '-gradient-chart)', name: 'Profit',
            border: { width: 2, color: borderColor[themes.indexOf(theme)] }
        }],
        tooltip: { enable: true, shared: true, header: '<b>England<b>', format: '${point.x} : <b>${point.y}<b>' },
        height: '350',
        width: ej.base.Browser.isDevice ? '100%' : '80%',
        theme: theme, legendSettings: { visible: false }
    });
    chart.appendTo('#chart');
    var range = new ej.charts.RangeNavigator({
        width: ej.base.Browser.isDevice ? '100%' : '80%',
        valueType: 'DateTime',
        tooltip: { enable: true, displayMode: 'Always' },
        intervalType: 'Years',
        value: [new Date('2014-01-01'), new Date('2015-12-31')],
        series: [{
            dataSource: datasrc, xName: 'xDate', yName: 'High', type: 'Area',
            fill: 'url(#' + selectedTheme + '-gradient-chart)',
            border: { width: 2, color: borderColor[themes.indexOf(theme)] }
        }],
        enableRtl: true,
        changed: function (args) {
            chart.primaryXAxis.zoomFactor = args.zoomFactor;
            chart.primaryXAxis.zoomPosition = args.zoomPosition;
            chart.dataBind();
        },
        theme: theme
    });
    range.appendTo('#container');
};
this.default = function () {
    var datasrc;
    var ajax = new ej.base.Ajax('./src/range-navigator/data-source/axes-data.json', 'GET', true);
    ajax.send().then();
    ajax.onSuccess = function (data) {
        datasrc = JSON.parse(data);
        datasrc.map(function (data) {
            data.xDate = new Date(data.xDate);
        });
        _this.renderRTLChart(datasrc);
    };
};