import React from 'react'

var divStyle = {
	'background-color': 'blue',
  	height: '300px'
};

var IndexSection = React.createClass({
    render: function() {
        return (
            <section style={divStyle}>Ipsum dolor and stuff</section>
        )
    }
});

module.exports = IndexSection;
