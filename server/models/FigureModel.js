const { DataTypes } = require('sequelize')
const db = require('../db')

const Figure = db.sequelize.define('figure', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
},
{
    timestamps: false
})

const FigureInfo = db.sequelize.define('figure_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    birthYear: {type: DataTypes.INTEGER},
    deathYear: {type: DataTypes.INTEGER},
    figureAvatar: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING, require: true},
    slug: {type: DataTypes.STRING, unique: true},
},
{
    timestamps: false
})

const Header = db.sequelize.define('header', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    headerImg: {type: DataTypes.STRING},
    headerName: {type: DataTypes.STRING}
},
{
    timestamps: false
})

const About = db.sequelize.define('about', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    figureImg: {type: DataTypes.STRING},
    aboutText: {type: DataTypes.TEXT},
},
{
    timestamps: false
})

const Gallery = db.sequelize.define('gallery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
},
{
    timestamps: false
})

const GalleryItem = db.sequelize.define('gallery_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    galleryFile: {type: DataTypes.TEXT},
    galleryName: {type: DataTypes.STRING}, 
},
{
    timestamps: false
})

const History = db.sequelize.define('history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
},
{
    timestamps: false
})


const HistoryItem = db.sequelize.define('history_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    historyFile: {type: DataTypes.TEXT},
    historyTitle: {type: DataTypes.STRING},
    historyYears: {type: DataTypes.STRING},
    historyDescription: {type: DataTypes.TEXT}
},
{
    timestamps: false
})

Figure.hasOne(FigureInfo)
FigureInfo.belongsTo(Figure)

Figure.hasOne(About)
About.belongsTo(Figure)

Figure.hasOne(Header)
Header.belongsTo(Figure)

Figure.hasOne(Gallery)
Gallery.belongsTo(Figure)

Gallery.hasMany(GalleryItem)
GalleryItem.belongsTo(Gallery)

Figure.hasOne(History)
History.belongsTo(Figure)

History.hasMany(HistoryItem)
HistoryItem.belongsTo(History)

module.exports = {
    Figure,
    FigureInfo,
    Header,
    About,
    History,
    HistoryItem,
    Gallery,
    GalleryItem,
}
// module.exports = Figure,
// module.exports = FigureInfo,
// module.exports = Header,
// module.exports = About,
// module.exports = History,
// module.exports = HistoryItem,
// module.exports = Gallery,
// module.exports = GalleryItem