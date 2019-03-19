import React, { Component } from 'react';
import './developers.css';


class Developers extends Component {
	render() {

		return (
			<div className="container">
				<div className="row">
					<div className="heading-title text-center">
						<h3 className="text-uppercase">Meet Our Developers</h3>
					</div>

					<div className='developers'>
						<div className='top'>
							<div className="col-md-4 col-sm-4">
								<div className="team-member">
									<div className="team-img">
										<img 
											src={require("./images/Sukhada.jpg")}
											alt="team member" 
											className="img-responsive"
										/>
									</div>
									<div className="team-hover">
										<div className="desk">
											<h4>Check My Portfolio</h4>
										</div>
										<div className="s-link">
											<a href='https://github.com/sukhadagholba' className='icon' target='_blank'>
												<i class="fab fa-github fa-lg"></i>
											</a>
										</div>
									</div>
								</div>
								<div className="team-title">
									<h5>Sukhada Gholba</h5>
									<span>Web Developer</span>
								</div>
							</div>
							
							<div className="col-md-4 col-sm-4">
								<div className="team-member">
									<div className="team-img">
										<img 
											src={require("./images/Cameron.png")}
											alt="team member" 
											className="img-responsive"
										/>
									</div>
									<div className="team-hover">
										<div className="desk">
											<h4>Check My Portfolio</h4>
										</div>
										<div className="s-link">
											<a href='https://github.com/upsmancsr' className='icon' target='_blank'>
												<i class="fab fa-github fa-lg"></i>
											</a>
										</div>
									</div>
								</div>
								<div className="team-title">
									<h5>Cameron Ray</h5>
									<span>Web Developer</span>
								</div>
							</div>
						</div>

						<div className='bottom'>
							<div className="col-md-4 col-sm-4">
								<div className="team-member">
									<div className="team-img">
										<img 
											src={require("./images/Linda.png")}
											alt="team member" 
											className="img-responsive"
										/>
									</div>
									<div className="team-hover">
										<div className="desk">
											<h4>Check My Portfolio</h4>
										</div>
										<div className="s-link">
											<a href='https://github.com/lyang9' className='icon' target='_blank'>
												<i class="fab fa-github fa-lg"></i>
											</a>
										</div>
									</div>
								</div>
								<div className="team-title">
									<h5>Linda Yang</h5>
									<span>Web Developer</span>
								</div>
							</div>

							<div className="col-md-4 col-sm-4">
								<div className="team-member">
									<div className="team-img">
										<img 
											src={require("./images/Wonjae.png")}
											alt="team member" 
											className="img-responsive"
										/>
									</div>
									<div className="team-hover">
										<div className="desk">
											<h4>Check My Portfolio</h4>
										</div>
										<div className="s-link">
											<a href='https://github.com/verydecent' className='icon' target='_blank'>
												<i class="fab fa-github fa-lg"></i>
											</a>
										</div>
									</div>
								</div>
								<div className="team-title">
									<h5>Wonjae Hwang</h5>
									<span>Web Developer</span>
								</div>
							</div>

							<div className="col-md-4 col-sm-4">
								<div className="team-member">
									<div className="team-img">
										<img 
											src={require("./images/Jennifer.jpg")}
											alt="team member" 
											className="img-responsive"
										/>
									</div>
									<div className="team-hover">
										<div className="desk">
											<h4>Check My Portfolio</h4>
										</div>
										<div className="s-link">
											<a href='https://github.com/chainchompa' className='icon' target='_blank'>
												<i class="fab fa-github fa-lg"></i>
											</a>
										</div>
									</div>
								</div>
								<div className="team-title">
									<h5>Jennifer Player</h5>
									<span>Web Developer</span>
								</div>
							</div>
						</div>
					</div>	
				</div>	

				<div className="footer">
					<div className="copyright">
						<a href='https://www.netlify.com/' target='_blank'>
							<p className="netlify">Netlify</p>
						</a>
						<p className="rights"> &copy; Copyright 2019 Lambda School Lab10 Chattr - All rights reserved</p>
						<br/>
						<img
							className="footerNetlify"
							src={require("./images/logomark.png")}
							alt="Netlify logo"
						/>
					</div>
				</div>

			</div>    
		);
	}
}

export default Developers;

