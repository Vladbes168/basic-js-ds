const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this._addNode(this.rootNode, newNode);
    }
  }

  _addNode(current, newNode) {
    if (newNode.data < current.data) {
      if (!current.left) {
        current.left = newNode;
      } else {
        this._addNode(current.left, newNode);
      }
    } else {
      if (!current.right) {
        current.right = newNode;
      } else {
        this._addNode(current.right, newNode);
      }
    }
  }

  has(data) {
    return this._hasNode(this.rootNode, data);
  }

  _hasNode(current, data) {
    if (!current) {
      return false;
    }

    if (data === current.data) {
      return true;
    }

    if (data < current.data) {
      return this._hasNode(current.left, data);
    } else {
      return this._hasNode(current.right, data);
    }
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(current, data) {
    if (!current) {
      return null;
    }

    if (data === current.data) {
      return current;
    }

    if (data < current.data) {
      return this._findNode(current.left, data);
    } else {
      return this._findNode(current.right, data);
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(current, data) {
    if (!current) {
      return null;
    }

    if (data < current.data) {
      current.left = this._removeNode(current.left, data);
      return current;
    } else if (data > current.data) {
      current.right = this._removeNode(current.right, data);
      return current;
    } else {
      if (!current.left) {
        return current.right;
      }

      if (!current.right) {
        return current.left;
      }

      const minRight = this._findMinNode(current.right);
      current.data = minRight.data;
      current.right = this._removeNode(current.right, minRight.data);
      return current;
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    const node = this._findMinNode(this.rootNode);
    return node.data;
  }

  _findMinNode(current) {
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    const node = this._findMaxNode(this.rootNode);
    return node.data;
  }

  _findMaxNode(current) {
    while (current.right) {
      current = current.right;
    }
    return current;
  }
}

module.exports = {
  BinarySearchTree,
};
