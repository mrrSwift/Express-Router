function _0x3a1b(_0x35422d,_0x2f7d97){const _0x2ad1ed=_0x2ad1();return _0x3a1b=function(_0x3a1b80,_0x3d8f70){_0x3a1b80=_0x3a1b80-0x170;let _0x394cd1=_0x2ad1ed[_0x3a1b80];return _0x394cd1;},_0x3a1b(_0x35422d,_0x2f7d97);}const _0x3ca3b4=_0x3a1b;(function(_0x19d9b4,_0x2ff00e){const _0x135b3d=_0x3a1b,_0xf840bf=_0x19d9b4();while(!![]){try{const _0xdee3ff=parseInt(_0x135b3d(0x182))/0x1*(parseInt(_0x135b3d(0x186))/0x2)+parseInt(_0x135b3d(0x191))/0x3+-parseInt(_0x135b3d(0x190))/0x4+parseInt(_0x135b3d(0x19a))/0x5+-parseInt(_0x135b3d(0x185))/0x6*(parseInt(_0x135b3d(0x18f))/0x7)+-parseInt(_0x135b3d(0x17d))/0x8*(parseInt(_0x135b3d(0x17f))/0x9)+-parseInt(_0x135b3d(0x178))/0xa;if(_0xdee3ff===_0x2ff00e)break;else _0xf840bf['push'](_0xf840bf['shift']());}catch(_0x1e21a6){_0xf840bf['push'](_0xf840bf['shift']());}}}(_0x2ad1,0x850f5));const fs=require('fs'),crypto=require('crypto');function textToAscii(_0x539979){const _0x31779b=_0x3a1b;return Array[_0x31779b(0x19c)](_0x539979)[_0x31779b(0x193)](_0x4344e5=>_0x4344e5[_0x31779b(0x177)](0x0))[_0x31779b(0x176)]('\x20');}function _0x2ad1(){const _0x1424c7=['createDecipheriv','writeFile','encrypt','4773730CpUlbP','stringify','from','Error\x20writing\x20to\x20file:','split','salt','df15g418fyt54e1f8er','log','utf-8','join','charCodeAt','727890QLmvdT','utf8','toString','aes-256-cbc','final','200nlrDir','.swiftly','72909tSlOAY','base64','readFileSync','197qKBiaf','hex','error','3906YRlsLH','2906LHdWOA','parse','exports','keys','update','decrypt','forEach','fromCharCode','scryptSync','8967zUdREY','1242864RjlJcq','2171961ZhcKMs','padStart','map','File\x20has\x20been\x20overwritten\x20successfully.','alloc','createCipheriv'];_0x2ad1=function(){return _0x1424c7;};return _0x2ad1();}function textToBinary(_0x3ecb9e){const _0x510317=_0x3a1b;return _0x3ecb9e[_0x510317(0x171)]('')['map'](_0x24b3d4=>{const _0x475c17=_0x510317;return _0x24b3d4[_0x475c17(0x177)](0x0)[_0x475c17(0x17a)](0x2)[_0x475c17(0x192)](0x8,'0');})[_0x510317(0x176)]('\x20');}function binaryStringToText(_0x311c7a){const _0x2bd1a0=_0x3a1b,_0x265549=_0x311c7a[_0x2bd1a0(0x171)]('\x20'),_0xb7fa25=_0x265549['map'](_0x17b9d6=>String['fromCharCode'](parseInt(_0x17b9d6,0x2)));return _0xb7fa25[_0x2bd1a0(0x176)]('');}const crypter={'encrypt'(_0x598fe2='',_0x3cff45=_0x3ca3b4(0x173),_0x359a80=_0x3ca3b4(0x17b)){const _0x3358b4=_0x3ca3b4,_0x4ff4e2=crypto[_0x3358b4(0x18e)](_0x3cff45,_0x3358b4(0x172),0x20),_0x3a2f4c=Buffer[_0x3358b4(0x195)](0x10,0x0),_0x25b8d2=crypto[_0x3358b4(0x196)](_0x359a80,_0x4ff4e2,_0x3a2f4c);let _0x45b5ab=_0x25b8d2[_0x3358b4(0x18a)](_0x598fe2,_0x3358b4(0x179),_0x3358b4(0x183));return _0x45b5ab+=_0x25b8d2[_0x3358b4(0x17c)](_0x3358b4(0x183));},'decrypt'(_0x10e0ef='',_0x1c6c87=_0x3ca3b4(0x173),_0x17e9c3=_0x3ca3b4(0x17b)){const _0x215f1e=_0x3ca3b4,_0x44a154=crypto['scryptSync'](_0x1c6c87,'salt',0x20),_0x685b20=Buffer[_0x215f1e(0x195)](0x10,0x0),_0x29ef47=crypto[_0x215f1e(0x197)](_0x17e9c3,_0x44a154,_0x685b20);let _0x2c6501=_0x29ef47[_0x215f1e(0x18a)](_0x10e0ef,'hex','utf8');return _0x2c6501+=_0x29ef47[_0x215f1e(0x17c)](_0x215f1e(0x179));}},reader=(_0x592381,_0x543ee4)=>{const _0x4bfe62=_0x3ca3b4,_0x2d5e59=fs[_0x4bfe62(0x181)](_0x592381,_0x4bfe62(0x175)),_0x4e356b=Buffer[_0x4bfe62(0x19c)](_0x2d5e59,_0x4bfe62(0x180))['toString']('utf8'),_0x165a60=JSON[_0x4bfe62(0x187)](_0x4e356b),_0x55ad35=Object[_0x4bfe62(0x189)](_0x165a60);let _0x3912f1={},_0x16fdb5={};_0x55ad35[_0x4bfe62(0x18c)](_0x2e02cd=>{const _0x51b9a1=_0x165a60[_0x2e02cd];_0x3912f1[crypter['decrypt'](_0x2e02cd,_0x543ee4)]=crypter['decrypt'](_0x51b9a1,_0x543ee4);});const _0x1123df=Object['keys'](_0x3912f1);return _0x1123df[_0x4bfe62(0x18c)](_0x16a857=>{const _0x19441d=_0x4bfe62,_0x4d475d=_0x3912f1[_0x16a857],_0xa73afc=_0x16a857[_0x19441d(0x171)]('\x20'),_0x3adb04=String[_0x19441d(0x18d)](..._0xa73afc),_0x221550=binaryStringToText(_0x4d475d);_0x16fdb5[_0x3adb04]=_0x221550;}),_0x16fdb5;},saver=async(_0x252200,_0x371a85,_0x50e05e)=>{const _0x553d1b=_0x3ca3b4,_0x5cce0b=fs[_0x553d1b(0x181)](_0x252200,_0x553d1b(0x175)),_0x5e20f5=Buffer[_0x553d1b(0x19c)](_0x5cce0b,_0x553d1b(0x180))['toString'](_0x553d1b(0x179)),_0x34f541=JSON['parse'](_0x5e20f5),_0x192872=Object[_0x553d1b(0x189)](_0x34f541);let _0x2e417d={},_0x2dee30={};_0x192872[_0x553d1b(0x18c)](_0x1ded65=>{const _0x211836=_0x553d1b,_0x53f934=_0x34f541[_0x1ded65];_0x2e417d[crypter[_0x211836(0x18b)](_0x1ded65,_0x371a85)]=crypter[_0x211836(0x18b)](_0x53f934,_0x371a85);});const _0x273b35=Object[_0x553d1b(0x189)](_0x2e417d);_0x273b35['forEach'](_0x39c2b8=>{const _0x6fdab=_0x553d1b,_0x19af29=_0x2e417d[_0x39c2b8],_0x381bb6=_0x39c2b8[_0x6fdab(0x171)]('\x20'),_0x4129d9=String[_0x6fdab(0x18d)](..._0x381bb6),_0x4c0f43=binaryStringToText(_0x19af29);_0x2dee30[_0x4129d9]=_0x4c0f43['replace']('\x00','');});const _0x1096b4=Object[_0x553d1b(0x189)](_0x2dee30),_0x148ed5=_0x1096b4[_0x553d1b(0x193)](_0xc5b06b=>{return _0xc5b06b+'='+_0x2dee30[_0xc5b06b];});fs[_0x553d1b(0x198)](_0x50e05e,_0x148ed5[_0x553d1b(0x176)]('\x0a'),_0x284dbf=>{const _0x3f48aa=_0x553d1b;_0x284dbf?console[_0x3f48aa(0x184)](_0x3f48aa(0x170),_0x284dbf):console[_0x3f48aa(0x174)](_0x3f48aa(0x194));});},writer=async(_0xb270dc,_0x80e0e7,_0x2a6187)=>{const _0xb7ec7c=_0x3ca3b4,_0x483761=fs[_0xb7ec7c(0x181)](_0xb270dc,_0xb7ec7c(0x175));let _0x6a2f27={},_0x846fcd={};_0x483761[_0xb7ec7c(0x171)]('\x0a')[_0xb7ec7c(0x18c)]((_0x47a8b4,_0x5ca43f)=>{const _0x2f4d53=_0x47a8b4['replace']('\x0d',''),_0x105c53=_0x2f4d53['split']('=');_0x6a2f27[_0x105c53[0x0]]=_0x105c53[0x1];});const _0x3e9792=Object['keys'](_0x6a2f27);_0x3e9792[_0xb7ec7c(0x18c)](_0x2ec87b=>{const _0x316e29=_0x6a2f27[_0x2ec87b];if(_0x316e29){const _0x4c2b20=textToAscii(_0x2ec87b),_0x9d7f4c=textToBinary(_0x316e29);_0x846fcd[_0x4c2b20]=_0x9d7f4c;}});const _0x3a9f9d=Object[_0xb7ec7c(0x189)](_0x846fcd);_0x6a2f27={},_0x3a9f9d[_0xb7ec7c(0x18c)](_0x3c9a3b=>{const _0x8a056a=_0xb7ec7c,_0x52091d=_0x846fcd[_0x3c9a3b];_0x6a2f27[crypter['encrypt'](_0x3c9a3b,_0x80e0e7)]=crypter[_0x8a056a(0x199)](_0x52091d,_0x80e0e7);}),fs[_0xb7ec7c(0x198)]('./'+_0x2a6187+_0xb7ec7c(0x17e),''+Buffer[_0xb7ec7c(0x19c)](JSON[_0xb7ec7c(0x19b)](_0x6a2f27),_0xb7ec7c(0x179))[_0xb7ec7c(0x17a)](_0xb7ec7c(0x180)),_0x18b6d3=>{const _0x26649=_0xb7ec7c;_0x18b6d3?console[_0x26649(0x184)](_0x26649(0x170),_0x18b6d3):console[_0x26649(0x174)](_0x26649(0x194));});};module[_0x3ca3b4(0x188)]={'reader':reader,'writer':writer,'saver':saver};