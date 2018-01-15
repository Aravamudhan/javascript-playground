function movieTest() {
    var myMovies = {
        movies: [],
        set movie(m) {
            this.movies.push(m)
        },
        get latest() {
            if (this.movies.length === 0) {
                return 'movie list empty'
            } else {
                return this.movies[this.movies.length - 1]
            }
        },
        get notifier() {
            return this.notifier = 'You have called the notifier'
        }
    };
    console.log(myMovies.latest)
    myMovies.movie = 'Bolt'
    myMovies.movie = 'Dark Knight Rises'
    myMovies.movie = 'Trumbo'
    console.log(myMovies.latest)
    console.log(myMovies.notifier)
}
function someTest(){
    var args = Array.prototype.slice.call(arguments);
    console.log(args);
    args.concat(function(){
        console.log("Yo");
    });
    console.log(args);
}
// movieTest();
someTest("Hi",function(a){
    return a*a;
});