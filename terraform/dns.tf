data "aws_route53_zone" "codurance" {
  name = "codurance.io"
}

resource "aws_route53_record" "openspace" {
  zone_id = "${data.aws_route53_zone.codurance.zone_id}"
  name    = "openspace.codurance.io"
  type    = "A"

  alias {
    name                   = "${aws_alb.main.dns_name}"
    zone_id                = "${aws_alb.main.zone_id}"
    evaluate_target_health = true
  }
}