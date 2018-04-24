import BasicLayout from '../components/BasicLayout.js';
import SignupForm from '../components/signup/SignupForm.js';
import FontAwesome from 'react-fontawesome';
import "../styles.scss";

class Signup extends React.Component {
	constructor (props){
		super(props);
		this.addError = this.addError.bind(this);
		this.state = { error: "" };
		this.aboutHeader = "Make your knowledge work for you";
		this.aboutText = "All of your companys knowledge sorted and"
			+ "fully searchable in one unified solution.";
	}

	componentDidMount(){
    document.body.style.backgroundColor = "#3ea9f5";
	}

	componentWillUnmount(){
	    document.body.style.backgroundColor = null;
	}

	addError(error) {
		this.setState({error: error});
	}

	render() {
		//document.body.style.backgroundColor = "green";

		return (
			<BasicLayout>
				<div className="signup-page">
					<div className="signup-header">
						<FontAwesome name='database' />
						<span className="signup-header-text"> Knowledge-Base</span>
					</div>
					<div className="error-container">
						{this.state.error}
					</div>
					<div className="signup-form-container">
						<div className="signup-text-header">
							{this.aboutHeader}
						</div>
						<div className="signup-text">
							{this.aboutText}
						</div>
						<SignupForm addError={this.addError} />
					</div>
				</div>
			</BasicLayout>
		);
	}
}

export default Signup;
