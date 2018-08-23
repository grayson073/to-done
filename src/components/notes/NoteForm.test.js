import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NoteForm from './NoteForm';

describe('Note Form', () => {

  it('Renders add if no note prop', () => {
    const handleComplete = jest.fn();
    const promise = Promise.resolve();
    handleComplete.mockReturnValueOnce(promise);

    const wrapper = mount(<NoteForm onComplete={handleComplete}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();

    const note = {
      title: 'Note 1',
      content: 'Get a job',
      completed: false
    };

    wrapper.find('input[name="title"]').simulate('change', {
      target: { 
        name: 'title',
        value: note.title
      }
    });
    
    wrapper.find('input[name="content"]').simulate('change', {
      target: { 
        name: 'content',
        value: note.content 
      }
    });

    wrapper.find('button').simulate('submit');

    // test we got the search term
    const calls = handleComplete.mock.calls;
    expect(calls.length).toBe(1); // only called once
    expect(calls[0][0]).toEqual(note);
    expect(toJSON(wrapper)).toMatchSnapshot();

    return promise
      .then(() => {
        wrapper.update();
        expect(toJSON(wrapper)).toMatchSnapshot();
      });
  });

});