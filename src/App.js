import React, { Component } from "react";
import TOC from "./component/TOC";
import Subject from "./component/Subject";
import ReadContent from "./component/ReadContent";
import Control from "./component/Control";
import './App.css';
import CreateContent from "./component/CreateContent";
import UpdateContent from "./component/UpdateContent";

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

    getReadContent() {
        let i = 0;
        while (i < this.state.contents.length) {
            let data = this.state.contents[i];
            if (data.id === this.state.selected_content_id) {
                return data;
                break;
            }
            i = i + 1;
        }
    }
    getContent(){
        let _title, _desc, _article = null;
        if (this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>
        } else if (this.state.mode === 'read') {
            let _content = this.getReadContent();
            _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
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
        } else if (this.state.mode === 'update') {
            let _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
                //add content to this.state.contents
                let _contents = Array.from(this.state.contents);
                let i = 0;
                while (i < _contents.length) {
                    if (_contents[i].id === _id) {
                        _contents[i] = {id:_id, title:_title, desc:_desc};
                        break;
                    }
                    i = i + 1;
                }
                
                this.setState({
                    contents : _contents,
                    mode : 'read'
                });
            }.bind(this)} ></UpdateContent>
        }
        return _article;
    }

  render() {
    console.log('App reader')
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
                  onChangePage={function(id){
                      this.setState({
                          mode:'read',
                          selected_content_id : Number(id)
                      });
                  }.bind(this)}
                  data={this.state.contents}
              ></TOC>
              <Control onChangeMode={function (_mode){
                  if (_mode === 'delete') {
                      if (window.confirm('really?')) {
                          let _contents = Array.from(this.state.contents);
                          let i = 0;
                          while (i < _contents.length) {
                              if (_contents[i].id === this.state.selected_content_id) {
                                  _contents.splice(i, 1);
                                  break;
                              }
                              i = i+1;
                          }
                          this.setState({
                              mode: 'welcome',
                              _contents : _contents
                          });
                      }
                  } else {
                      this.setState({
                          mode:_mode
                      });
                  }
              }.bind(this)}></Control>
              {this.getContent()}
          </div>
      );
  }
}

export default App;
