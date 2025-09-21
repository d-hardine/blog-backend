const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function getArticles(categoryName, searchTerm) {
    if(!categoryName && !searchTerm) { //if the user just open the homepage without clicking category tag and searching something
        return prisma.post.findMany({
            where: {
                published: true
            },
            include: {
                categories: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else if(!searchTerm && categoryName) { //if the user clicking  the category tag
        return prisma.post.findMany({
            where: {
                published: true,
                categories: {
                    every: {
                        name: categoryName
                    }
                }
            },
            include: {
                categories: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        return prisma.post.findMany({ //if the user about to search something
            where: {
                published: true,
                title: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            },
            include: {
                categories: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
}

async function getCategories() {
    return prisma.category.findMany()
}

async function getArticle(articleId) {
    return prisma.post.findFirst({
        where: {
            id: articleId
        },
        include: {
            author: true,
            categories: true,
        },
    })
}

async function getComments(articleId) {
    return prisma.comment.findMany({
        where: {
            postId: articleId
        },
        include: {
            author: true
        }
    })
}

async function addNewComment(articleId, userId, newComment) {
    return prisma.comment.create({
        data: {
            postId: articleId,
            body: newComment,
            authorId: userId
        },
    })    
}

async function createNewUser(firstName, lastName, username, email, hashedPassword) {
    return await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        }
    })
}

async function lookupUser(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        },
    })
}

async function searchArticle(searchInput) {
    
}

module.exports = {getArticles, getCategories, getArticle, getComments, addNewComment, createNewUser, lookupUser, searchArticle}