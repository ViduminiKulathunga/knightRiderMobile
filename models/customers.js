class customers {
  constructor(
    id,
    userId,
    username,
    start,
    end,
    createdAt,
    distance,
    fullName,
    phone,
    imageUrl,
    commission,
  ) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.start = start;
    this.end = end;
    this.createdAt = createdAt;
    this.distance = distance;
    this.fullName = fullName;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.commission = commission;
  }
}

export default customers;
