import React, {Component} from "react";

class UpdateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        console.log('************');
        console.log(this.props.data);
        console.log('updateCondtent reader')
        return (
            <article>
                <h2>Update</h2>
                <form action="/create_process" method="post"
                    onSubmit={function (e){
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            e.state.title,
                            e.state.desc
                        );
                    }.bind(this)}
                >
                    <input type="hidden" name="id" value={this.state.id}/>
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFormHandler}
                        />
                    </p>
                    <p>
                        <textarea
                            name="desc"
                            placeholder="description"
                            value={this.state.desc}
                            onChange={this.inputFormHandler}
                        >{this.state.desc}</textarea>
                    </p>
                    <p><input type="submit"/></p>
                </form>
            </article>
        )
    }
}

export default UpdateContent