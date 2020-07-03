/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:45
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 14:09:48
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
import { publishNote, getNoteDetails, editNote } from '@services/modules/note'
import { handleMoney } from '@utils/patter'
import { setStorage, removeStorage } from '@utils/storage'
import { getImage } from '@assets/cdn'
import goodsState from '@config/noteState'
import FormItem from '@components/FormItem'

import './index.scss'

class NotePublish extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, goodsState, {
      // 除去公共key以外的字段定在这里
      canInputBrand: false
    })
    this.pageParams = {}
    this.timer = null
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.pageParams = this.$router.params
    this.login()
    console.log('this.pageParams', this.pageParams)
    if (this.pageParams && this.pageParams.pageType === 'edit' ) {
      this.getNoteDetails()
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
    this.timer = null
    removeStorage('choose_category')
    removeStorage('choose_brand')
  }
  async login() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  getNoteDetails() {
    getNoteDetails({
      noteId: this.pageParams.noteId
    }).then((res) => {
      const json = Object.assign({}, res.data)
      delete res['data']
      const data = Object.assign({}, res, json)
      this.setState(data)
    })
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
   * 点击了选择类别
   * @return void
   */
  handleClickChooseCategory() {
    let url = '/pages/choose_category/index'
    const { mainCategory, childCategory } = this.state
    if (childCategory && childCategory.categoryName) {
      url += '?pageType=edit'
      setStorage('choose_category', {
        selectMainCategoriesData: mainCategory,
        selectChildCategoriesData: childCategory,
      })
    }
    Taro.navigateTo({
      url
    })
  }
  /**
   * 点击了选择品牌
   * @return void
   */
  handleClickChooseBrand() { 
    const { mainCategory, brand } = this.state
    let url = `/pages/choose_brand/index?categoryId=${mainCategory.categoryId}`
    if (brand && brand.brandName) {
      url += '&pageType=edit'
      setStorage('choose_brand', brand)
    }
    Taro.navigateTo({
      url
    })
  }
  onBrandInput(e) {
    const { target: { value } } = e
    this.setState({
      brand: {brandName: value}
    })
  }
  onPriceInput(e) {
    let { target: { value } } = e
    value = handleMoney(value)
    this.setState({
      price: value
    })
    return value
   }

  onModelInput(e) {
    const { target: { value } } = e
    this.setState({
      model: value
    })
  }

  onRemarkInput(e) {
    const { target: { value } } = e
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
      // mainCategory: '请选择品类',
      // childCategory: '请选择品类',
      brand: '请选择建材品牌',
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
        if (key === 'brand' && !state[key].brandName) {
          breakName = key
          break
        } else if (key === 'address' && !state[key].address) {
          breakName = key
          break
        }
        // else if (key !== 'address' && !state[key].categoryId) {
        //   breakName = key
        //   break
        // }
      }
    }
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
    if (this.pageParams.pageType === 'edit') { 
      sendData.noteId = this.pageParams.noteId
      editNote(sendData, this).then(() => {
        Taro.showToast({
          title: '编辑成功',
        })
      })
      this.timer = setTimeout(() => {
        Taro.navigateBack()
      }, 1800)
    } else {
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
        removeStorage('choose_brand')
        this.timer = setTimeout(() => {
          Taro.redirectTo({
            url: `/pages/note_details/index?noteId=${res.noteId}`
          })
        }, 1800)
      })
    }
  }
  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    const {
      userInfo
    } = this.props
    return {
      title: `录屋,和监理一起开启装修之旅吧`,
      path: `/pages/index/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: getImage('share/share_index.png')
    }
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
      canInputBrand
    } = this.state
    const categoryText = mainCategory && mainCategory.categoryId ? mainCategory.categoryName + ' - ' + childCategory.categoryName : ''
    return (
      <SaveAreaView title='记笔记' back>
        <View className='page-wrapper'>
          <View className='goods-image-wrapper'>
            <View className='goods-image-list-wrapper'>
              <Upload
                autoChoose
                showAddBtn
                imageSize={180}
                addBtnSizeType={86}
                imageList={goodsImageList}
                onUploadOK={this.onGoodsImageUpload.bind(this)}
              />
            </View>
            <View className='goods-image-tips'>请上传清晰完整的建材照片，建议上传多张不同角度照片，笔记转发比价时，可以帮助店老板快速识别建材，让您马上就能获得报价。~</View>
          </View>
          <View className='card-wrapper form-wrapper'>
            <View className='form-card-item'>
              <View className='form-card-label'>价格标签</View>
              <View className='form-card-content'>
                <Upload
                  showAddBtn
                  imageSize={130}
                  addBtnSize={130}
                  computedWidth='280'
                  imageList={priceTagImageList}
                  onUploadOK={this.onPriceTagUpload.bind(this)}
                />
              </View>
            </View>
          </View>
          <View className='form-wrapper'>
            <FormItem
              line
              unit='icon'
              label='建材类型'
              canInput={false}
              placeholder='请选择'
              value={categoryText}
              iconName='iconRectangle rotated'
              shortUnit={priceUnit.length < 3}
              onContentClick={this.handleClickChooseCategory.bind(this)}
            />
            <FormItem
              line
              important
              label='建材品牌'
              focus={canInputBrand}
              value={brand.brandName}
              canInput={canInputBrand}
              iconName='iconRectangle rotated'
              shortUnit={priceUnit.length < 3}
              unit={canInputBrand ? true : 'icon'}
              onInput={this.onBrandInput.bind(this)}
              placeholder={canInputBrand ? '请输入' : '请选择'}
              onContentClick={this.handleClickChooseBrand.bind(this)}
            />
            <FormItem
              line
              important
              type='digit'
              unit='text'
              value={price}
              label='建材价格'
              placeholder='请输入'
              unitContent={'/'+ priceUnit}
              shortUnit={priceUnit.length < 3}
              onInput={this.onPriceInput.bind(this)}
            />
            <FormItem
              unit='show'
              value={model}
              label='建材型号'
              placeholder='请输入'
              shortUnit={priceUnit.length < 3}
              onInput={this.onModelInput.bind(this)}
            />
          </View>
          <View className='form-wrapper textarea-wrapper'>
            <View className='form-label-title'>补充信息</View>
            <Textarea
              autoHeight
              value={remark}
              maxlength={300}
              className='textarea'
              placeholderClass='placeholder-class'
              placeholder='您可以记下价格范围和价格折扣'
              onInput={this.onRemarkInput.bind(this)}
            ></Textarea>
            <View className='num-tips'>{300 - remark.length}</View>
          </View>
          <View className='form-wrapper card-wrapper'>
            <View className='form-card-item'>
              <View className='form-card-label'>老板名片</View>
              <View className='form-card-content'>
                <Upload
                  showAddBtn
                  imageSize={130}
                  addBtnSize={130}
                  computedWidth='280'
                  imageList={idCardImageList}
                  onUploadOK={this.onIdCardImageUpload.bind(this)}
                />
              </View>
            </View>
          </View>
          <View className='title'>门店地址</View>
          <Location
            address={address || {}}
            onGetLocationData={this.onGetLocationData.bind(this)}
          />
          <View className='bottom-wrapper'>
            <View className='bottom-btn-tips'>保存笔记马上全城比价，50家建材城等着给您报价</View>
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