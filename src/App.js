import React, { Component } from "react";
import TOC from "./component/TOC";
import Subject from "./component/Subject";
import ReadContent from "./component/ReadContent";
import Control from "./component/Control";
import './App.css';
import CreateContent from "./component/CreateContent";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode : 'create',
            max_content_id : 3,
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
      let _title, _desc, _article = null;
      if (this.state.mode === 'welcome') {
          _title = this.state.welcome.title;
          _desc = this.state.welcome.desc;
          _article = <ReadContent title={_title} desc={_desc}></ReadContent>
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
          _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      } else if (this.state.mode === 'create') {
         _article = <CreateContent onSubmit={function(_title, _desc){
             //add content to this.state.contents
            this.max_content_id = this.max_content_id + 1
             let _contents = this.state.contents.concat(
                 {id: this.max_content_id, title: _title, desc: _desc}
             )
             this.setState({
                 contents : _contents
             });
         }.bind(this)} ></CreateContent>
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
              <Control onChangeMode={function (_mode){
                this.setState({
                    mode: _mode
                })
              }.bind(this)}></Control>
              {_article}
          </div>
      );
  }
}

export default App;
