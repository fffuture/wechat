package com.xit.service;


import java.util.List;

import com.xit.entity.User;



public interface UserService {
	
	public List<User> findAllUser();
	
	public User findUser(String weChatId);
	
	public String login(String weChatId,String password,String device);
	
	public String register(String weChatId,String password);
}
