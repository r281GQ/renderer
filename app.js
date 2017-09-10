var newElement = Renderer.createElement(8,'label', 'initial text', []);

var element = Renderer.createElement(2, 'article', null, [
  newElement,
  { _id: 3, htmlType: 'section', props: null, children: [] }
]);

Renderer.attachInitial('root', element);

Renderer.mainRender();
