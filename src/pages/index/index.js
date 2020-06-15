import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Actions from '@actions'

// import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

class Index extends Component {

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user_msg.userInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userInfo => dispatch(Actions.changeUserInfo(userInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
