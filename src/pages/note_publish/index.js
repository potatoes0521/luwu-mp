/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:45
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:28:51
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
import Login from '@utils/login'
import { publishNote } from '@services/modules/note'
import { handleMoney } from '@utils/patter'
import { setStorage, removeStorage } from '@utils/storage'
import goodsState from '@config/noteGoodsKey'
import FormItem from './components/FormItem'

import './index.scss'

class NotePublish extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, goodsState, {
      // 除去公共key以外的字段定在这里
    })
    this.pageParams = {}
    this.timer = null
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.pageParams = this.$router.pageParams
    this.login()
    if (this.pageParams && this.pageParams.pageType === 'edit' ) {

    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
    this.timer = null
  }
  login() {
    Login.login()
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
  /**
   * 点击了选择类别
   * @return void
   */
  handleClickChooseCategory() {
    let url = '/pages/choose_item/index'
    const {
      mainCategory,
      childCategory,
      brand
    } = this.state
    if (brand && brand.brandName) { 
      url += '?pageType=edit'
      setStorage('choose_category', {
        selectMainCategoriesData: mainCategory,
        selectChildCategoriesData: childCategory,
        selectBrandData: brand,
      })
    }
    Taro.navigateTo({
      url
    })
  }
  
  onPriceInput(e) {
    let {target: {value}} = e
    value = handleMoney(value)
    console.log('value', value)
    this.setState({
      price: value
    })
    return value
   }

  onModelInput(e) { 
    const {target: {value}} = e
    this.setState({
      model: value
    })
  }

  onRemarkInput(e) { 
    const {target: {value}} = e
    this.setState({
      remark: value
    })
  }
  submit() {
    const {
      goodsImageList,
      idCardImageList,
      priceTagImageList,
      address,
      price,
      priceUnit,
      remark,
      mainCategory,
      childCategory,
      brand,
      model,
    } = this.state
    const testKey = {
      goodsImageList: '至少上传一张商品图片~',
      // idCardImageList: '',
      // priceTagImageList,
      mainCategory: '请选择品类',
      childCategory: '请选择品类',
      brand: '请选择品牌',
      price: '请填写价格',
      // priceUnit,
      // remark: '',
      address: '请选择建材商场~',
    }
    const state = this.state
    let breakName = ''
    for (const key in testKey) {
      if (Array.isArray(state[key]) && state[key].length < 1) {
        breakName = key
        break
      }
      if (typeof state[key] === 'string' && !state[key]) {
        breakName = key
        break
      }
      if (Object.prototype.toString.call(state[key]) === '[object Object]') {
        if (key === 'brand' && !state[key].brandId) {
          breakName = key
          break
        } else if (key === 'address' && !state[key].address) {
          breakName = key
          break
        } else if (key !== 'address' && !state[key].categoryId) {
          breakName = key
          break
        }
      }
    }
    console.log('breakName', breakName)
    if (breakName) {
      Taro.showToast({
        title: testKey[breakName],
        icon: 'none',
        duration: 2000
      })
      return
    }
    let sendData = {
      categoryId: mainCategory.categoryId,
      secondCategoryId: childCategory.categoryId,
      brandId: brand.brandId,
      data: {
        goodsImageList,
        idCardImageList,
        priceTagImageList,
        address,
        price,
        priceUnit,
        remark,
        mainCategory,
        childCategory,
        brand,
        model
      }
    }
    publishNote(sendData, this).then(res => {
      if (!res || !res.noteId) {
        Taro.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
        return
      }
      Taro.showToast({
        title: '添加成功',
      })
      removeStorage('choose_category')
      this.timer = setTimeout(() => {
        if (this.pageParams.pageType === 'edit') { 
          Taro.navigateBack()
        } else {
          Taro.redirectTo({
            url: `/pages/note_details/index?noteId=${res.noteId}`
          })
        }
      }, 1800)
    })
  }

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
      price,
      priceUnit,
      remark,
      mainCategory,
      childCategory,
      brand,
      model,
    } = this.state
    const categoryText = mainCategory && mainCategory.categoryId ? mainCategory.categoryName + ' - ' + childCategory.categoryName + ' - ' + brand.brandName : ''
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
              unit='icon'
              iconName='iconRectangle rotated'
              value={categoryText}
              canInput={false}
              placeholder='请选择'
              onContentClick={this.handleClickChooseCategory.bind(this)}
            />
            <FormItem
              line
              important
              type='digit'
              unit='text'
              label='价格'
              value={price}
              unitContent={priceUnit}
              placeholder='请输入'
              onInput={this.onPriceInput.bind(this)}
            />
            <FormItem
              unit='show'
              label='型号'
              value={model}
              placeholder='请输入'
              onInput={this.onModelInput.bind(this)}
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
              onInput={this.onRemarkInput.bind(this)}
              maxlength={500}
            ></Textarea>
          </View>
          <View className='bottom-wrapper'>
            <View className='button' onClick={this.submit.bind(this)}>保存笔记</View>
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