<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 首页分类 -->
		<view class="nav-list">
			<view v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层item项 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4个小图片 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], // 轮播图数据
				navList: [], //分类导航的数据列表
				floorList: [], //楼层数据列表
			};
		},
		onLoad() {
			this.getSwiperList() //获取轮播图数据
			this.getNavList() //获取分类导航数据
			this.getFloorList() //获取楼层列数据
		},
		methods: {
			// 获取轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 请求失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 请求成功，给 swiperList 赋值
				this.swiperList = res.message;
				// console.log('------swiperList',this.swiperList);
			},
			// 获取分类导航数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				// 请求失败
				if (res.meta.status !== 200) return uni.$showMsg()
				//请求成功
				this.navList = res.message;
				// console.log('------navList',this.navList);
			},
			// navItem 分类项被点击时
			navClickHandler(item) {
				// 判断点击的是哪个 nav
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层列表数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				// 请求失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 请求成功
				res.message.forEach(floor =>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split("?")[1]
					})
				})
				this.floorList = res.message
				console.log('------floorList', this.floorList);
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
