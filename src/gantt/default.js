this.default = function () {
    var ganttChart = new ej.gantt.Gantt({
        dataSource: window.projectNewData,
        height: '450px',
        allowSelection: true,
        highlightWeekends: true,
        treeColumnIndex: 1,
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        },
        columns: [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName',headerText: 'Name', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ],
        labelSettings: {
            leftLabel: 'TaskName'
        },
        projectStartDate: new Date('03/24/2019'),
        projectEndDate: new Date('07/06/2019')
    });
    ganttChart.appendTo('#Default');
};
