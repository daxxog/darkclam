contract Echo {
    bytes32 gData;
    
    function Test(bytes32 data) returns(bytes32 x) {
        log0(gData);
        gData = data;
        log0(gData);
        
        return data;
    }
}