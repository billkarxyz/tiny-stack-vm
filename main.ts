import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",E=new TextEncoder;
function R(p,q){
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),l=0,j=0,c=0,k=0,P=0,s=0;
const F=x=>[o.subarray(0,l),x];
for(;;){
if(s==1e6)return F(10);
if(c<0||c>=p.length)return F(9);
let n=p[c],m=n==1?1:n==2?4:n>47&&n<52?2:0,u,v;
if(c+m>=p.length)return F(9);
if(n<8){u=n<3?0:n<5?1:n<7?2:3;v=n?n<3?1:n==3?0:n<6?2:3:0}
else if(n<16)return F(5);
else if(n<35){u=n==23||n==27?1:2;v=1}
else if(n<48)return F(5);
else if(n<53){u=n==49||n==50?1:0;v=0}
else if(n<64)return F(5);
else if(n<66){u=n==64?1:2;v=n==64?1:0}
else if(n<80)return F(5);
else if(n<84){u=n==82?0:1;v=n==82?1:0}
else return F(5);
s++;
let t=c+1+m;
if(P<u)return F(2);
if(P-u+v>256)return F(3);
c=t;
switch(n){
case 0:return F(0);
case 1:D[P++]=p[t-1]<<24>>24;break;
case 2:D[P++]=p[t-4]|p[t-3]<<8|p[t-2]<<16|p[t-1]<<24;break;
case 3:P--;break;
case 4:D[P]=D[P-1];P++;break;
case 5:{let a=D[P-1];D[P-1]=D[P-2];D[P-2]=a;break}
case 6:D[P]=D[P-2];P++;break;
case 7:{let a=D[P-3];D[P-3]=D[P-2];D[P-2]=D[P-1];D[P-1]=a;break}
case 23:D[P-1]=-D[P-1]|0;break;
case 27:D[P-1]=~D[P-1];break;
case 48:c=t+((p[t-2]|p[t-1]<<8)<<16>>16);break;
case 49:case 50:{let w=D[--P];if((n==49)==(w==0))c=t+((p[t-2]|p[t-1]<<8)<<16>>16);break}
case 51:if(k==64)return F(7);C[k++]=t;c=p[t-2]|p[t-1]<<8;break;
case 52:if(!k)return F(8);c=C[--k];break;
case 64:{let a=D[P-1];if(a<0||a>255)return F(6);D[P-1]=M[a];break}
case 65:{let a=D[P-1];if(a<0||a>255)return F(6);M[a]=D[P-2];P-=2;break}
case 80:{let b=E.encode(String(D[P-1]));if(l+b.length>65536)return F(11);o.set(b,l);l+=b.length;P--;break}
case 81:if(l>65535)return F(11);o[l++]=D[--P]&255;break;
case 82:D[P++]=j<q.length?q[j++]:-1;break;
case 83:return F(D[--P]&255);
default:{let b=D[P-1],a=D[P-2],r;
if(n==16)r=a+b|0;else if(n==17)r=a-b|0;else if(n==18)r=Math.imul(a,b);
else if(n==19){if(!b)return F(4);r=(a/b)|0}
else if(n==20){if(!b)return F(4);r=a%b|0}
else if(n==21){if(!b)return F(4);r=(a>>>0)/(b>>>0)|0}
else if(n==22){if(!b)return F(4);r=(a>>>0)%(b>>>0)|0}
else if(n==24)r=a&b;else if(n==25)r=a|b;else if(n==26)r=a^b;
else if(n==28)r=a<<b;else if(n==29)r=a>>b;else if(n==30)r=a>>>b|0;
else if(n==32)r=a==b?1:0;else if(n==33)r=a<b?1:0;else r=a>>>0<b>>>0?1:0;
P-=2;D[P++]=r;break}
}
}
}
for(const d of readdirSync(I).sort()){
let r=R(new Uint8Array(readFileSync(join(I,d,"program.bin"))),new Uint8Array(readFileSync(join(I,d,"input.bin"))));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,"stdout.bin"),r[0]);
writeFileSync(join(O,d,"exit.txt"),r[1]+"\n");
}
