var TomatoBox =  React.createClass({
  render: function() {
    return (
      <div className="tomatoBox">
        <Timebox/>
      </div>
    );
  }
});

var Timebox =  React.createClass({
	getInitialState: function(){
		return{
			time:25 * 60,
			tickingFlag:false,
			workingFlag:true,
			action:'start'
		};
	},
	tick: function(){
		this.setState({time:this.state.time - 1})
	},
	componentDidMount: function(){
		//this.interval = setInterval(this.tick, 1000)
	},
	handleClick: function(){
		if(this.state.tickingFlag){
			clearInterval(this.interval);
			this.setState({action:'start'});
		}else{
			this.interval = setInterval(this.tick, 1000);
			this.setState({action:'stop'});
		}
		this.setState({tickingFlag:!this.state.tickingFlag});
	},
	componentWillUpdate: function(){
		if(this.state.time<1){
			document.getElementById("sound").play();
			clearInterval(this.interval);
			this.setState({tickingFlag:false, action:'start'});
			if(this.state.workingFlag){
				this.setState({time:5*60, workingFlag:!this.state.workingFlag});
			}else{
				this.setState({time:25*60, workingFlag:!this.state.workingFlag});
			}
		}
	},
	skip: function(){
		clearInterval(this.interval);
		this.setState({
			tickingFlag:false, 
			action:'start'
		});
		if(!this.state.workingFlag){
				this.setState({time:25*60, workingFlag:!this.state.workingFlag});
		}else{
				this.setState({time:5*60, workingFlag:!this.state.workingFlag});
		}
	},
	render: function(){
		return (
			<div className='timebox'>
				<h2>{this.state.workingFlag?'Working':'Relax'}</h2>
				<Timer time={this.state.time}/>
      	<button 
		      className='controller' 
		      onClick={this.handleClick} >{this.state.action}</button>
	    	<button onClick={this.skip}>skip</button>
	    	<audio controls="" id='sound'>
				  <source src="sound/liangyin.mp3" type="audio/mpeg"/>
				Your browser does not support the audio element.
				</audio>
      </div>
		);
	}
});

var Timer = React.createClass({
	displayName: 'Timer',
	getInitialState: function(){
		return{
			time: 0
		}
	},
	componentWillReceiveProps: function(nextProps){
		this.setState({time: this.formTime(nextProps.time)});
	},
	componentDidMount: function(){
		this.setState({time: this.formTime(this.props.time)});
	},
	formTime: function(s_time){
		var min = parseInt(s_time / 60);
		var sec = s_time % 60;
		if(sec<10)sec='0'+sec;
		return min + ':' + sec;
	},
	render: function(){
		return(
			<div className='timer'>
				<h2>{this.state.time}</h2>
			</div>
		);
	}
});

var app = <TomatoBox>haha</TomatoBox>;

ReactDOM.render(
  app,
  document.getElementById('tomato')
);
