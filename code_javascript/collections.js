function maps() {
    {
        console.log("------------------------------");
        let m = new Map();
        let id1 = {
            id: 1,
            name: "first"
        };
        let id2 = {
            id: 2,
            name: "second"
        };
        // To add an element
        m.set(id1, "Employee1");
        m.set(id2, "Employee2");
        console.log(m.size, m.get(id1), m.get(id2));
        // To remove an element
        m.delete(id1);
        console.log(m.has(id1));
        m.clear();
        console.log(m);
    } {
        console.log("------------------------------");
        let k1 = {
            uid: 101
        };
        let k2 = {
            uid: 102
        };
        let k3 = {
            uid: 103
        };
        let v1 = {
            name: "James",
            id: 1000,
            age: 25
        };
        let v2 = {
            name: "Ruptert",
            id: 1001,
            age: 27
        };
        let v3 = {
            name: "Ronald",
            id: 1002,
            age: 29
        };
        let spys = new Map();
        spys.set(k1, v1);
        spys.set(k2, v2);
        spys.set(k3, v3);
        console.log(spys.entries());
        console.log(spys.values());
        let keys = [...spys.keys()];
        console.log(keys);
    }
}
function setTest() {
    {
        let ids = new Set();
        let id1 = {id:1};
        let id2 = {id:2};
        let id3 = {id:3};
        let id4 = {id:4};
        let id11 = {id:1};
        ids.add(id1);
        ids.add(id2);
        ids.add(id1);
        console.log(ids.size);
        console.log(ids.entries());
    }
}
// maps();
setTest();