import React, { useState } from 'react';
import TextToSpeech from './TextToSpeech';
import axios from 'axios';

const SidePane = () => {
    return (
        <div id="sidebar" className="bg-orange-800 md:w-64 overflow-y-scroll sm:w-screen">
            <header className="flex justify-between items-center border-b border-orange-900 pt-8 pb-8 pl-6 pr-6">
                <div id="logo">
                    <a href="#" className="no-underline text-white md:text-2xl sm:text-4xl font-bold">
                        <img src="#" width="120" alt="" />
                        TEXT-TO-SPEECH
                    </a>
                </div>
                <div id="collapse" className="text-white border border-white p-2 h-8 rounded">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
            </header>
            <div id="profile" className="flex items-center border-b border-orange-900 px-8 py-6">
                <div id="img" className="w-1/4">
                    <img 
                        src="https://scontent.fscl14-1.fna.fbcdn.net/v/t1.0-1/p80x80/17353312_10211368131493981_4314191449503901504_n.jpg?oh=829362e45b722e771e7a7200c9191a5e&oe=5AC839A5" 
                        width="55" 
                        alt="" 
                        className="rounded-full"
                    />
                </div>
                <div id="welcome" className="text-white w-2/4 sm:ml-1 md:ml-4">
                    <p className="text-xs">Welcome,</p>
                    <span className="text-lg">hello </span>
                </div>
            </div>
            <ul id="menu" className="flex flex-col list-reset sm:hidden md:block">
                <li className="block">
                    <a href="#" className="no-underline text-white block h-full w-full border-b border-orange-900 px-8 py-4 hover:text-orange-400">
                        <i className="fa fa-tachometer mr-2" aria-hidden="true"></i>
                        Dashboard
                    </a>
                </li>
                <li className="flex justify-between block">
                    <a href="#" className="no-underline text-white block h-full w-full border-b border-orange-900 px-8 py-4 hover:text-orange-400">
                        <i className="fa fa-user mr-2" aria-hidden="true"></i>
                        Account
                        <i className="fa fa-angle-right float-right" aria-hidden="true"></i>
                    </a>
                </li>
                <li className="block">
                    <a href="#" className="no-underline text-white block h-full w-full border-b border-orange-900 px-8 py-4 hover:text-orange-400">
                        <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                        MailBox
                        <i className="fa fa-angle-down float-right" aria-hidden="true"></i>
                    </a>
                    <ul className="flex flex-col list-reset bg-orange-900 block">
                        <li className="flex block border-b border-orange-800">
                            <a href="#" className="no-underline text-white block h-full w-full ml-4 hover:text-orange-400 px-8 py-4">
                                <i className="fa fa-envelope-o mr-2" aria-hidden="true"></i>
                                Inbox
                            </a>
                        </li>
                        <li className="flex block border-b border-orange-800">
                            <a href="#" className="no-underline text-white block h-full w-full ml-4 hover:text-orange-400 px-8 py-4">
                                <i className="fa fa-envelope-o mr-2" aria-hidden="true"></i>
                                Categories
                                <i className="fa fa-angle-down float-right" aria-hidden="true"></i>
                            </a>
                        </li>
                        <ul className="flex flex-col list-reset bg-orange-900 block">
                            <li className="flex block border-b border-orange-800">
                                <a href="#" className="no-underline text-white block h-full w-full ml-8 hover:text-orange-400 px-8 py-4">
                                    <i className="fa fa-envelope-o mr-2" aria-hidden="true"></i>
                                    Social
                                </a>
                            </li>
                            <li className="flex block border-b border-orange-800">
                                <a href="#" className="no-underline text-white block h-full w-full ml-8 hover:text-orange-400 px-8 py-4">
                                    <i className="fa fa-envelope-o mr-2" aria-hidden="true"></i>
                                    Notifications
                                </a>
                            </li>
                        </ul>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SidePane;
