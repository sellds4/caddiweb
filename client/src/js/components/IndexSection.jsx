import React from 'react'

var divStyle = {
	backgroundColor: 'blue',
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
