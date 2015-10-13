import React from 'react'

var LoginForm = React.createClass({
    render: function() {
        return (
            <div>
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="email" ref="email" autoComplete="off" />
                    <input type="password" name="password" placeholder="password" ref="password" autoComplete="off" />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var email = React.findDOMNode(this.refs.email).value.trim(),
            password = React.findDOMNode(this.refs.password).value.trim();

        if (!email || !password) {
            return;
        }
        this.loginSubmit({email: email, password: password});
    },
    loginSubmit: function(regData) {
        $.ajax({
            url: '/api/login',
            dataType: 'json',
            type: 'POST',
            data: regData,
            success: function(data) {
                console.log(data);
                this.setState({data: data});
                alert('success');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
});

module.exports = LoginForm;
