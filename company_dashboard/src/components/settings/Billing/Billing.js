// import React from 'react'
// // import { connect } from 'react-redux'
// // import {
// //   getSubscription,
// //   changeSubscription,
// //   cancelFail,
// //   createSubscription,
// // } from '../../store/actions/usersActions'
// import NewSub from './NewSub'
// import ChangeSub from './ChangeSub'

// // import LoadingPage from '../loading/loading'

// class Billing extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSubscribed: false
//     }
//   }

//   componentDidMount() {
//     // getSub
//   }

//   // ** Replace with setState in method called as prop from child component
//   // componentDidUpdate(prevProps) {
//   //   if (prevProps.subscription !== this.props.subscription) {
//   //     if (this.props.subscription) {
//   //       this.setState({ hasSubscription: true })
//   //     }
//   //   }
//   // }

//   render() {
//     return (
//       <div>
//         {this.state.isSubscribed ? (
//           <ChangeSub
//             subscription={this.props.subscription}
//             changeSubscription={this.props.changeSubscription}
//             changeFail={this.props.changeFail}
//             cancelFail={this.props.cancelFail}
//             message={this.props.message}
//           />
//         ) : (
//           <NewSub />
//         )}
//         {/* {this.props.loading ? <LoadingPage /> : null} */}
//       </div>
//     )
//   }
// }

// export default Billing;