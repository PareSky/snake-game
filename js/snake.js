var Timebox =  React.createClass({
	render: function(){
		return (
			<div className='timer'>time left</div>
		);
	}
});
var Controller =  React.createClass({
	render: function(){
		return (
			<div className='controller'>controller</div>
		);
	}
});
var TomatoBox =  React.createClass({
  render: function() {
    return (
      <div className="tomatoBox">
        <Timebox/>
        <Controller/>
      </div>
    );
  }
});

var app = <TomatoBox>haha</TomatoBox>;

ReactDOM.render(
  app,
  document.getElementById('snake')
);
