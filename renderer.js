(function() {
  var Renderer = {
    vDOM: { _id: 'root', htmlType: 'div', state: null, children: [] },
    previousVDOM: {},

    //create vDOM elelement
    createElement: function(_id, htmlType, state, children) {
      return { _id: _id, htmlType: htmlType, state: state, children: children };
    },

    //search through the vDOM
    search: function(_id) {
      var self = this;
      var recursive = function(_id, element) {
        if (element._id === _id) return element;

        var results = [];

        for (var i = 0; i < element.children.length; i++) {
          results.push(recursive(_id, element.children[i]));
        }

        return results.filter(function(item) {
          return typeof item !== 'undefined';
        })[0];
      };

      return recursive(_id, self.vDOM);
    },

    //set the properties of the vDOM, need a lot improvement thogh
    //since it accesss the dom directyl whichs scope should be minimal
    setState: function(_id, newstate) {
      var element = this.search(_id);
      element.state = newstate;
      var domElement = document.getElementById(_id.toString());
      var father = domElement.parentNode;
      domElement.remove();
      this.updateDOM(father, element);
    },

    //should only be callled before mainRender
    attachInitial: function(id, element) {
      this.search(id).children.push(element);
    },

    //attached element to vDOM, then writes them to the DOM
    attach: function(id, element) {
      this.search(id).children.push(element);
      this.updateDOM(document.getElementById(id.toString()), element);
    },

    //updates the corresponding part of the DOM
    updateDOM: function(root, toRender) {
      var self = this;
      self.recursive(root, toRender);
    },

    //helpers function for accessing the DOM
    recursive: function(father, element) {
      var domElement = document.createElement(element.htmlType);
      domElement.id = element._id;
      if (element.state) domElement.innerHTML = element.state;
      father.append(domElement);
      if (element.children.length === 0) {
        return;
      } else {
        for (var i = 0; i < element.children.length; i++) {
          this.recursive(domElement, element.children[i]);
        }
      }
    },

    //initial render
    mainRender: function() {
      var self = this;
      document.addEventListener('DOMContentLoaded', function() {
        self.recursive(document.getElementById('root'), self.vDOM);
      });
    }
  };

  this.Renderer = Renderer;
  return Renderer;
})();
