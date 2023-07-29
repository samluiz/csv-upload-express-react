function processParams(prisma) {
  return async (req, res, next) => {
    const name = req.query.name || "";
    const city = req.query.city || "";
    const country = req.query.country || "";
    const favorite_sport = req.query.favorite_sport || "";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const query = {
        AND: [
          {
            name: {
              contains: name,
            },
          },
          {
            city: {
              contains: city,
            },
          },
          {
            country: {
              contains: country,
            },
          },
          {
            favorite_sport: {
              contains: favorite_sport,
            },
          },
        ],
      }

    const count = await prisma.user.count({
      where: query
    });
  

    const result = {};
    if (endIndex < (count)) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    result.current = {
      page: page,
      limit: limit,
    }
    result.total_pages = Math.ceil((count) / limit);
    result.total_items = count;
    try {
      result.results = await prisma.user.findMany({
        skip: startIndex,
        take: limit,
        where: query
      });
      res.paginatedResult = result;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = processParams;