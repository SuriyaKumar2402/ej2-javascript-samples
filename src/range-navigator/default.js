/**
 * Default appearance of the range navigator
 */
var _this = this;
var selectedTheme = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
var theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
var themes = ['Material', 'Fabric', 'Bootstrap', 'HighContrast', 'Bootstrap5', 'Tailwind', 'MaterialDark', 'FabricDark', 'BootstrapDark', 'TailwindDark', 'Fluent', 'FluentDark'];
var borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4', '#262E0B', '#4F46E5', '#00bdae', '#4472c4', '#5ECB9B', '#8B5CF6', '#614570', '#8AB113'];
var regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(38, 46, 11, 0.3)', 'rgba(79, 70, 229, 0.3)',
    'rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(139, 92, 246, 0.3)'];
this.renderDefaultChart = function (datasrc) {
    var range = new ej.charts.RangeNavigator({
        valueType: 'DateTime',
        tooltip: { enable: true, displayMode: 'Always' },
        value: [new Date('2017-09-01'), new Date('2018-02-01')],
        labelFormat: 'MMM-yy',
        navigatorStyleSettings: {
            unselectedRegionColor: 'transparent',
            selectedRegionColor: regionColor[themes.indexOf(theme)]
        },
        series: [
            {
                dataSource: datasrc,
                xName: 'x', yName: 'y', type: 'Area', width: 2,
                fill: 'url(#' + selectedTheme + '-gradient-chart)',
                border: { width: 2, color: borderColor[themes.indexOf(theme)] }
            }
        ],
        width: ej.base.Browser.isDevice ? '100%' : '80%',
        theme: theme
    });
    range.appendTo('#container');
};
this.default = function () {
    var datasrc;
    var ajax = new ej.base.Ajax('./src/range-navigator/data-source/default_data.json', 'GET', true);
    ajax.send().then();
    ajax.onSuccess = function (data) {
        datasrc = JSON.parse(data);
        datasrc.map(function (data) {
            data.x = new Date(data.x);
        });
        _this.renderDefaultChart(datasrc);
    };
};