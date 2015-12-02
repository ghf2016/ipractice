function ListNode(data) {
  this.next = null;
  this.prev = null;
  this.data = data;
}

function HashList() {
  this.head_ = null;
  this.tail_ = null;
  this.size_ = 0;
  this.map_ = {};
}

HashList.prototype.size = function() {
  return this.size_;
};

HashList.prototype.add = function(key, value) {
  var newNode = new ListNode(value);
  this.map_[key] = newNode;
  if (this.head_ === null) {
    this.head_ = this.tail_ = newNode;
  } else if (this.head_ === this.tail_) {
    this.head_.next = newNode;
    newNode.prev = this.head_;
    this.tail_ = newNode;
  } else {
    this.tail_.next = newNode;
    newNode.prev = this.tail_;
    this.tail_ = newNode;
  }
  this.size_++;
};

HashList.prototype.get = function(key) {
  var node = this.map_[key];
  if (node) {
    return node.data;
  } else {
    return null;
  }
};

HashList.prototype.remove = function(key) {
  var node = this.map_[key];
  if (node) {
    var prev = node.prev;
    var next = node.next;
    if (prev) {
      prev.next = next;
    }
    if (next) {
      next.prev = prev;
    }
    delete this.map_[key];
    this.size_--;
    if (this.size_ === 1) {
      this.tail_ = this.head_;
    } else if (this.size_ === 0) {
      this.head_ = this.tail_ = null;
    }
  }
};

HashList.prototype.select = function(offset, limit, reverse) {
  var result = [];
  if (limit <= 0) {
    return result;
  }

  var node = reverse ? this.tail_ : this.head_;
  while (node && offset > 0) {
    if (reverse) {
      node = node.prev;
    } else {
      node = node.next;
    }
    offset--;
  }
  while (node && limit > 0) {
    result.push(node.data);
    if (reverse) {
      node = node.prev;
    } else {
      node = node.next;
    }
    limit--;
  }
  return result;
};

HashList.prototype.each = function(cb) {
  var node = this.head_;
  while (node) {
    cb(node.data);
    node = node.next;
  }
};

module.exports = HashList;
