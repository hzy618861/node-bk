
function sum(a,b){
     return a+b
}
test('测试1 10+20',()=>{
     const res = sum(10,20)
     expect(res).toBe(30)
     expect(res).not.toBe(40)
})