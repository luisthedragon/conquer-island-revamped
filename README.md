# Conquer Island Revamped

Conquer the island by defeating all the lions on the board.<br>
Clicking on a tile makes it change from lion to dog or viceversa.<br>
Adjacent tiles are also flipped.<br>
This game was inspired by the [Lights out](https://en.wikipedia.org/wiki/Lights_Out_(game)) game and is a revamp of the game I made back in 2020 using Vue 2 and bootstrap Vue (js ecosystem has changed a lot indeed) [Conquer Island](https://github.com/luisthedragon/conquer-island)

## Project setup

```bash
pnpm install
```

### Compiles and hot-reloads for development

```bash
pnpm run serve
```

### Compiles and minifies for production

```bash
pnpm run build
```

### Lints and fixes files

```bash
pnpm run lint
```

### TODO

- [x] Initialize app using [T3 stack](https://create.t3.gg/)
- [x] Render the board with dog and lion images
- [x] Implement core game functionality
- [x] Add winning screen
- [x] Set background image
- [x] Deploy to vercel
- [x] Make sure mobile experience is great!
- [x] Add counter of clics
- [x] Add seed input
- [x] Add play again button on winner page
- [x] Show number of moves and seed on winner page
- [x] Fix bug when clicking tile in a 4x4 or bigger board, it does not flip correctly
- [x] Add board size selector 
- [x] Fix image size, it overflows on mobile
- [x] Add github link to source code
- [x] Add game seed and board size in url
- [x] Show share button on winner page
- [ ] Improve seeding (Unique seed per board configuration)
- [ ] Add highscores
- [ ] Fix leading zero not disapearing in seed input
- [ ] Add login to save highscores per account
- [ ] Add support for creating bigger boards
- [ ] Add about page
- [ ] Publish in steam
- [ ] Add twitter link to my twitter
- [ ] Multiplayer mode
- [ ] Add badges in readme
- [ ] More awesome features!

V2

- [ ] Add option to select images of dog, lion and background

### Acknowledgments

Thanks a lot to the authors of the images from Unsplash:

Dog: Photo by <a href="https://unsplash.com/@jaclynclark?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jaclyn Clark</a> on <a href="https://unsplash.com/photos/short-coated-black-and-white-dog-UzO4kgBMCv4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

Lion: Photo by <a href="https://unsplash.com/@mariolagr?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">MARIOLA GROBELSKA</a> on <a href="https://unsplash.com/photos/lion-in-black-background-in-grayscale-photography-8a7ZTFKax_I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

Photo by <a href="https://unsplash.com/@rosiesun?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Rosie Sun</a> on <a href="https://unsplash.com/photos/photography-of-forest-1L71sPT5XKc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

### Contributions

Contributions from the community to make Conquer Island Revamped even better are gladly welcome! Whether you're fixing a bug, adding a feature, or improving documentation, your contributions are appreciated.

To contribute to the project, follow these steps:

1. **Fork** the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature` or `git checkout -b bugfix/your-bug-fix`.
3. Make your changes and ensure that they work as expected.
4. Commit your changes: `git commit -am 'Add some feature'`.
5. Push to the branch: `git push origin feature/your-feature`.
6. Submit a pull request detailing your changes.

Please make sure your pull request adheres to the following guidelines:

- Describe what you've changed and why.
- Keep the pull request focused on a single improvement.
- Ensure your code follows the project's coding style and conventions.
- Test your changes thoroughly before submitting the pull request.
