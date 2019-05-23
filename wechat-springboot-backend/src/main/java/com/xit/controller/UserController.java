package com.xit.controller;



import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.github.pagehelper.PageHelper;
import com.xit.entity.RespCode;
import com.xit.entity.RespEntity;
import com.xit.entity.User;
import com.xit.service.UserService;
import com.xit.utils.SocketServer;
import com.xit.utils.jwtHandler;

import io.jsonwebtoken.Claims;


@RestController/**自动返回的是json格式数据***/
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	/*@Autowired
	private TokenService tokenService;*/

	@RequestMapping("list")
	public List<User> list(){
		 //只对紧邻的下一条select语句进行分页查询，对之后的select不起作用
        PageHelper.startPage(1,3);
		List<User> list = userService.findAllUser();
		return list;
	}
	
/*	@RequestMapping(value="login",method = RequestMethod.GET)
	public String login(String id,String passWord,String device) {
		User result = userService.login( id, passWord);
		if(result != null) {
			return jwtHandler.creatJWT(result.getWeChatId().toString(), device);
		}
		return "登录失败！！账号或者密码错误";
	}*/
	
	@RequestMapping(value = "login",method = RequestMethod.POST)
	public String login(String weChatId,String password,String device) {		
//		System.out.println("weChatId"+weChatId+"password"+password);	
		return userService.login( weChatId, password,device);
		
	}
	//查询个人信息
	@RequestMapping(value = "queryUserInfo",method = RequestMethod.POST)
	public User queryUserInfo(@RequestBody User user) {		
		System.out.println("weChatId"+user.getWeChatId());	
//		return userService.login( weChatId, password,device);
		User responseUser = userService.findUser(user.getWeChatId());
		responseUser.setPassword("***");
		return responseUser;
		
	}
	
	@RequestMapping(value = "register",method = RequestMethod.POST)
	public RespEntity register(@RequestBody User user ) {			
//		System.out.println("账号"+ user.getWeChatId() + "  password:"+  user.getPassword() );	
		return new RespEntity(RespCode.SUCCESS,userService.register( user.getWeChatId(), user.getPassword() ));
	}
	
	@RequestMapping(value = "testToken",method = RequestMethod.POST)
	public RespEntity testToken(@RequestHeader("token") String token) {
		System.out.println("token" + token);	
		return new RespEntity(RespCode.SUCCESS);
	}
	
	@RequestMapping(value="parseJWT",method = RequestMethod.POST)
	public Claims parseJWT(String id,String device) {
		User result = userService.findUser( id );
		if(result != null) {
			String token = jwtHandler.creatJWT(result.getWeChatId().toString(),device);
			return  jwtHandler.parseJWT(token);
		}
		
		return null;
	}

}
