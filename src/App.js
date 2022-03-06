import React, { Component } from "react";
import TOC from "./component/TOC";
import Subject from "./component/Subject";
import Content from "./component/Content";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode : 'read',
            selected_content_id:2,
            subject : {title: 'Web', sub : 'world wide web'},
            welcome : {title : 'welcome', desc : 'HELLO, React!!'},
            contents : [
                {id:1, title:'HTML', desc:'HTML is hypertext ....'},
                {id:2, title:'css', desc:'css is design ....'},
                {id:3, title:'js', desc:'js is for interactive ....'},
            ]
        }
    }
  render() {
      let _title, _desc = null;
      if (this.state.mode === 'welcome') {
          _title = this.state.welcome.title;
          _desc = this.state.welcome.desc;
      } else if (this.state.mode === 'read') {
          let i = 0;
          while (i < this.state.contents.length) {
              let data = this.state.contents[i];
              if (data.id === this.state.selected_content_id) {
                  _title = data.title;
                  _desc = data.desc;
                  break;
              }
              i = i + 1;
          }
      }
      return (
          <div className="App">
              <Subject
                  title={this.state.subject.title}
                  sub={this.state.subject.sub}
                  onChangePage={function () {
                  this.setState({mode:'welcome'})
              }.bind(this)}
              >
              </Subject>
              <TOC
                  onChangePage={function(e){
                      this.setState({
                          mode:'read',
                          selected_content_id : 0
                      });
                  }.bind(this)}
                  data={this.state.contents}
              ></TOC>
              <Content title={_title} desc={_desc}></Content>
          </div>
      );
  }
}

export default App;
