/**
 * RichTextEditor Online Html Editor sample
 */

this.default = function () {
  var textArea;
  var srcArea;
  var myCodeMirror;
  var defaultRTE;
  var splitObj;

  // Add the styles and script referrence for code-mirror.
    splitObj = new ej.layouts.Splitter({
      height: '450px',
      resizing: onResizing,
      width: '100%',
      paneSettings: [{
        resizable: true,
        size: '50%', min: '20%',
      }, {}],
    });
    splitObj.appendTo('#horizontal');
    defaultRTE = new ej.richtexteditor.RichTextEditor({
      height: '100%',
      enableFloating: false,
      toolbarSettings: {
        type: 'Expand',
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
          'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
          'Outdent', 'Indent',
          'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat',
          '|', 'Undo', 'Redo'
        ]
      },
      saveInterval: 1,
      actionComplete: updateValue,
      change: onChange,
      showCharCount: true,
      maxLength: 5000,
      created: onCreate,
    });
    defaultRTE.appendTo('#defaultRTE');

    function onChange() {
      updateValue();
    }
    function onResizing()
    {
      defaultRTE.refreshUI();
    }
    function onCreate() {
      updateValue();
      textArea = defaultRTE.contentModule.getEditPanel();
      srcArea = document.querySelector('.source-code');
      if (srcArea) {
        srcArea.addEventListener('keyup', function (e) {
          updateHtmlValue();
        });
      }
    }

    function updateHtmlValue() {
      defaultRTE.value = myCodeMirror.getValue();
    }

    function updateValue() {
      var mirrorView = document.querySelector('#src-view');
      if (!mirrorView) {
        mirrorView = ej.base.createElement('div', {
          className: 'e-content'
        });
        mirrorView.id = 'src-view';
        var srcCodeElement = document.querySelector('.source-code');
        if (srcCodeElement) {
          srcCodeElement.appendChild(mirrorView);
        }
        mirrorView.innerHTML = '';
        mirrorView.style.display = 'block';
      }
      var srcViewEle = document.querySelector('#src-view');
      var codemirrorEle = document.querySelector('.CodeMirror-wrap');
      if (codemirrorEle) {
        codemirrorEle.remove();
      }
      if(defaultRTE.value){
        renderCodeMirror(srcViewEle, defaultRTE.value);
      }
    }

    function renderCodeMirror(mirrorView, content) {
      myCodeMirror = CodeMirror(mirrorView, {
        value: content,
        lineNumbers: true,
        mode: 'text/html',
        lineWrapping: true,
      });
    }
  };

