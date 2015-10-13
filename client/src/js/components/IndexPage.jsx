import React from 'react'

var Footer = require('./Footer.jsx'),
	Header = require('./Header.jsx'),
	IndexSection = require('./IndexSection.jsx');

var IndexPage = React.createClass({
    render: function() {
        return (
        	<div>
            	<Header />
            	<IndexSection />
            	<IndexSection />
            	<IndexSection />
            	<Footer />
            </div>
        )
    }
});

module.exports = IndexPage;
