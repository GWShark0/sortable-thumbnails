import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import classNames from 'classnames';
import times from 'lodash/times';

import './App.scss';

const reorder = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const remove = (array, index) => {
  const result = Array.from(array);
  result.splice(index, 1);
  return result;
};

const numbers = times(16, Number);

const SortableItem = SortableElement(props => {
  const { id, index, onRemove } = props;
  return (
    <div className="grid-item">
      <img
        className="grid-item__thumb"
        src={require(`./images/${id}.jpg`)}
        draggable="false"
        alt=""
      />
      <span className="grid-item__handle" />
      <span className="grid-item__index" onClick={() => onRemove(index)}>
        {index + 1}
      </span>
    </div>
  )
});

const SortableGrid = SortableContainer((props) => {
  const { isDragging, items, onRemove } = props;
  const classes = classNames('grid', isDragging && 'grid--dragging');

  return (
    <div className={classes}>
      {items.map((id, i) => (
        <SortableItem
          id={id}
          onRemove={onRemove}
          index={i}
          key={id}
        />
      ))}
    </div>
  );
});

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState(numbers);

  const onSortStart = () => {
    setIsDragging(true);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(reorder(items, oldIndex, newIndex));
    setIsDragging(false);
  };

  const removeItem = (index) => {
    setItems(remove(items, index));
  };

  return (
    <div className="app">
      <SortableGrid
        axis="xy"
        items={items}
        onSortStart={onSortStart}
        onSortEnd={onSortEnd}
        onRemove={removeItem}
        isDragging={isDragging}
        distance={5}
        helperClass="grid-item--helper"
      />
    </div>
  );
}

export default App;
