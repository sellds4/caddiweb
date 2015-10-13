import { Router, Route, Link, IndexRoute, IndexLink } from 'react-router'
import createBrowserHistory from '../../../node_modules/react-router/node_modules/history/lib/createBrowserHistory'

var history = createBrowserHistory();

// components
var LoginForm = require('./components/LoginForm.jsx'),
    IndexPage = require('./components/IndexPage.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <div className="app">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={IndexPage}/>
            <Route path="login" component={LoginForm}/>
        </Route>
    </Router>
);

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrfToken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("x-csrf-token", csrftoken);
        }
    }
});

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById("app"));
