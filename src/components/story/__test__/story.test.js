import React from 'react';
import ReactDOM from 'react-dom';
import StoryComponent from './../story';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer'

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StoryComponent></StoryComponent>, div)
});

it("renders story component correctly", () => {
    render(<StoryComponent></StoryComponent>)
});

it("matches snapshot", () => {
    const tree = renderer.create(<StoryComponent></StoryComponent>).toJSON();
    expect(tree).toMatchSnapshot();
});