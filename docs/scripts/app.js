"use strict";!function t(r,n,i){function o(u,c){if(!n[u]){if(!r[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(e)return e(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var f=n[u]={exports:{}};r[u][0].call(f.exports,function(t){var n=r[u][1][t];return o(n?n:t)},f,f.exports,t,r,n,i)}return n[u].exports}for(var e="function"==typeof require&&require,u=0;u<i.length;u++)o(i[u]);return o}({1:[function(t,r,n){$(function(){function t(){this.style.height=this.contentWindow.document.body.scrollHeight+5+"px"}var r=$(".tabs"),n=1;$(window).scroll(function(){var t=1-$(this).scrollTop()/50;t=Math.round(t),(n>0||t>0)&&r.css({opacity:t}),n=t}),$("a:not(.github)",r).click(function(){$("a",r).removeClass("active"),$(this).addClass("active")}),$("iframe").load(function(){t.apply(this),setTimeout(t.bind(this),1e3)})})},{}]},{},[1]);