import React, { Component } from "react";
import TOC from "./component/TOC";
import Subject from "./component/Subject";
import Content from "./component/Content";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject : {title: 'Web', sub : 'world wide web'},
            contents : [
                {id:1, title:'HTML', desc:'HTML is hypertext ....'},
                {id:2, title:'css', desc:'css is design ....'},
                {id:3, title:'js', desc:'js is for interactive ....'},
            ]
        }
    }
  render() {
    return (
        <div className="App">
            <Subject
                title={this.state.subject.title}
                sub={this.state.subject.sub}>

            </Subject>
            <TOC data={this.state.contents}></TOC>
            <Content title="HTML" desc="HTML is HyperText Markup Language"></Content>
        </div>
    );
  }
}

export default App;
