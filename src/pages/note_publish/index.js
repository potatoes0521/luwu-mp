/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:45
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 09:45:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Textarea
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Upload from '@components/Upload'
import Location from '@components/Location'
import SaveAreaView from '@components/SafeAreaView'
import FormItem from './components/FormItem'
import './index.scss'

class NotePublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      goodsImageList: [], // 商品图片
      idCardImageList: [], // 名片
      priceTagImageList: [], // 价签图片
      address: {
        address: ''
      }
    }
  }

  componentDidMount() {

  }
  /**
   * 上传图片完成
   * @param {Array} imageList 新上传的图片
   * @return void
   */
  onGoodsImageUpload(imageList) { 
    const {goodsImageList} = this.state
    this.setState({
      goodsImageList: [...goodsImageList, ...imageList]
    })
  }
  /**
   * 价签上传完成
   * @param {Array} imageList 新上传的图片
   * @return void
   */
  onPriceTagUpload(imageList) {
    const {priceTagImageList} = this.state
    this.setState({
      priceTagImageList: [...priceTagImageList, ...imageList]
    })
  }
  /**
   * 上传名片
   * @param {Array} imageList 新上传的图片
   * @return void
   */
  onIdCardImageUpload(imageList) {
    const {idCardImageList} = this.state
    this.setState({
      idCardImageList: [...idCardImageList, ...imageList]
    })
  }
  /**
   * 当获取到位置数据
   * @param {Object} data 获取到的数据
   * @return void
   */
  onGetLocationData(data) {
    this.setState({
      address: data
    })
  }
  /**
   * 公共标题
   * @param {String} title 标题文字
   * @return void
   */
  renderTitle(title) { 
    return (
      <View className='title'>{title}</View>
    )
  }
  onCategoryInput(event) { 
    console.log('event', event)
  }
  
  onPriceInput() { }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const {
      goodsImageList,
      idCardImageList,
      priceTagImageList,
      address,
      category,
      price,
      remark
    } = this.state
    return (
      <SaveAreaView title='记笔记' back home >
        <View className='page-wrapper'>
          <View className='goods-image-wrapper'>
            <View className='goods-image-list-wrapper'>
              <Upload
                imageList={goodsImageList}
                autoChoose
                imageSize={180}
                addBtnSizeType={86}
                showAddBtn
                onUploadOK={this.onGoodsImageUpload.bind(this)}
              />
            </View>
            <View className='goods-image-tips'>瓷砖类商品照片要注意拍摄光线哦~</View>
          </View>
          {
            this.renderTitle('您看中的产品信息')
          }
          <View className='form-wrapper'>
            <FormItem
              line
              important
              label='品类'
              unit='for-right'
              value={category}
              canInput={false}
              placeholder='请选择'
              onInput={this.onCategoryInput.bind(this)}
            />
            <FormItem
              line
              important
              unit='text'
              label='价格'
              value={price}
              unitContent='/每片'
              placeholder='请输入'
              onInput={this.onPriceInput.bind(this)}
            />
            <FormItem
              unit='show'
              label='型号'
              value={price}
              placeholder='请输入'
              onInput={this.onPriceInput.bind(this)}
            />
          </View>
          <View className='form-wrapper card-wrapper'>
            <View className='form-card-item'>
              <View className='form-card-label'>价签</View>
              <View className='form-card-content'>
                <Upload
                  showAddBtn
                  imageSize={130}
                  addBtnSize={130}
                  computedWidth='148'
                  imageList={priceTagImageList}
                  onUploadOK={this.onPriceTagUpload.bind(this)}
                />
              </View>
            </View>
            <View className='line'></View>
            <View className='form-card-item'>
              <View className='form-card-label'>名片</View>
              <View className='form-card-content'>
                <Upload
                  showAddBtn
                  imageSize={130}
                  addBtnSize={130}
                  computedWidth='148'
                  imageList={idCardImageList}
                  onUploadOK={this.onIdCardImageUpload.bind(this)}
                />
              </View>
            </View>
          </View>
          {
            this.renderTitle('门店地址')
          }
          <Location
            address={address}
            onGetLocationData={this.onGetLocationData.bind(this)}
          />
          {
            this.renderTitle('备注')
          }
          <View className='remark-wrapper'>
            <Textarea
              className='textarea'
              placeholderClass='placeholder-class'
              autoHeight
              placeholder='记笔记…'
              value={remark}
              maxlength={500}
            ></Textarea>
          </View>
          <View className='bottom-wrapper'>
            <View className='button'>保存笔记</View>
          </View>
        </View>
      </SaveAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
  }
}

export default connect(mapStateToProps)(NotePublish);